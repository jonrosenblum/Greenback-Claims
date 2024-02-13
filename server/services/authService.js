const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const secretKey = process.env.JWT_SECRET
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const aws = require("aws-sdk");
const sesTransport = require("nodemailer-ses-transport");
const emailTemplates = require('../emails/emailTemplates'); 





if (!secretKey) {
  console.error('JWT_SECRET is required');
  process.exit(1);
}

async function signup(username, email, password, referral_ID) {
  try {
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const referralLink = username+'_' + (await bcrypt.hash(username, 5));
    const newUser = await userModel.createUser(username, email, password, referral_ID);
    delete newUser.password
    return newUser;
  } catch (error) {
    throw new Error(error.message || 'Signup failed.');
  }
}

async function login(username, password) {
  try {
    const user = await userModel.findUserByUsername(username);
    console.log(user);
    if (!user) {
      throw new Error('Invalid username or password.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id, username:user.username, email:user.email, referral_id:user.referral_id,form_submissions:user.form_submissions,referral_frequency:user.referral_frequency }, secretKey, { expiresIn: '1h' });
      return token;
    } else {
      throw new Error('Invalid username or password.');
    }
  } catch (error) {
    throw new Error(error.message || 'Login failed.');
  }
}

async function findUserByID(userId) {
  try {
    const user = await userModel.findUserByID(userId);

    if (!user) {
      throw new Error('Invalid ID.');
    }
    return user
  } catch (error) {
    throw new Error(error.message || 'Login failed.');
  }
}


// Generate a secure random token
function generateResetToken() {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
}

async function sendUsernameInfoEmail(email, username) {
  try {
    const config = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    };

    aws.config.update(config);

    const transporter = nodemailer.createTransport(
      sesTransport({
        ses: new aws.SES({ apiVersion: "2010-12-01" }),
      })
    );

    const mailOptions = {
      from: 'claims@greenbackclaims.com',
      to: email,
      subject: 'Your Username',
      html: emailTemplates.forgotUsernameEmailTemplate(process.env.FRONTEND_APP_URL,username)
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send username information email.');
  }
}

// Send reset password email to the user
async function sendResetPasswordEmail(email, resetToken) {
  try {

    const config = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    };
    
    aws.config.update(config);

    const transporter = nodemailer.createTransport(
      sesTransport({
        ses: new aws.SES({ apiVersion: "2010-12-01" }),
      })
    );
    const mailOptions = {
      from: 'claims@greenbackclaims.com',
      to: email,
      subject: 'Password Reset',
      html: emailTemplates.forgotPasswordEmailTemplate( process.env.FRONTEND_APP_URL,resetToken)
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send reset password email.');
  }
}

// Implement forgot password functionality
async function forgotPassword(email) {
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }

    // Generate reset password token
    const resetToken = generateResetToken();

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Set expiration to one hour from now

    // Save reset token to the database
    await userModel.saveResetToken(email, resetToken, expirationDate);
    
    // Send resetToken to the user
    await sendResetPasswordEmail(email, resetToken);


    return resetToken; // Return the token for testing purposes or further use
  } catch (error) {
    throw new Error(error.message || 'Forgot password failed.');
  }
}

async function resetPassword(token, newPassword) {
  try {
    // 1. Find user by reset token
    const user = await userModel.findUserByResetToken(token);

    if (!user || user.resetPasswordExpires < Date.now()) {
      throw new Error('Invalid or expired reset token.');
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Update user's password in the database
    await userModel.updateUserPassword(user.id, hashedPassword);

    // 4. Clear reset token fields
    await userModel.clearResetToken(user.id);

    return { message: 'Password reset successful.' };
  } catch (error) {
    throw new Error(error.message || 'Password reset failed.');
  }
}

async function forgotUsername(email) {
  try {
    const user = await userModel.findUserByEmail(email);
    console.log(user);
    if (!user) {
      throw new Error('User not found.');
    }

    const username = user.username;

    await sendUsernameInfoEmail(email, username);

  } catch (error) {
    throw new Error(error.message || 'Forgot username failed.');
  }
}


module.exports = {
  signup,
  login,
  findUserByID,
  forgotPassword,
  forgotUsername,
  resetPassword
};
