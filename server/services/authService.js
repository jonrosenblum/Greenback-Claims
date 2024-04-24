const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const secretKey = process.env.JWT_SECRET
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const aws = require("aws-sdk");
const sesTransport = require("nodemailer-ses-transport");
const emailTemplates = require('../emails/emailTemplates'); 
const emailService = require("../services/emailService");


if (!secretKey) {
  console.error('JWT_SECRET is required');
  process.exit(1);
}

//******************************************************************/ 
// USER ROLES
//******************************************************************/ 

async function createRole(roleName) {
  try {
    const role = await userModel.findRoleByName(roleName);
    if (role) {
      throw new Error('Role is already exist.');
    }
    const newRole = await userModel.createUserRole(roleName);
    return newRole;
  } catch (error) {
    throw new Error(error.message || 'Create Role failed.');
  }
}


//******************************************************************/ 
// USER SIGNUP
//******************************************************************/ 
async function signup(username, email, password,role = 2) {
  try {
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      throw new Error('Username is already taken.');
    }
    const referral_ID = username+'_'+ Math.random().toString(16).substring(2)
    const newUser = await userModel.createUser(username, email, password, referral_ID, role);
    delete newUser.password
    return newUser;
  } catch (error) {
    throw new Error(error.message || 'Signup failed.');
  }
}


//******************************************************************/ 
// USER LOGIN
//******************************************************************/ 
async function login(username, password) {
  try {
    const user = await userModel.findUserByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      throw new Error('Invalid username or password.');
    }
    
    const role = await userModel.getUserRole(user.id);
    const token = jwt.sign(
      { userId: user.id,
        username:user.username,
        email:user.email, 
        role:role.role_name, 
        referral_id:user.referral_id,
        form_submissions:user.form_submissions,
        referral_frequency:user.referral_frequency
       }, 
       secretKey, { expiresIn: '1h' }
       );
    return token;

  } catch (error) {
    throw new Error(error.message || 'Login failed.');
  }
}



//******************************************************************/ 
// FIND USER BY ID
//******************************************************************/ 
async function findUserByID(userId) {
  try {
    const user = await userModel.findUserByID(userId);
    if (!user) {
      throw new Error('Invalid ID.');
    }
    return user
  } catch (error) {
    throw new Error(error.message || 'User not found.');
  }
}

//******************************************************************/ 
// FIND USER BY REFERRAL ID
//******************************************************************/ 
async function findUserByReferralID(referralID) {
  try {
    const user = await userModel.findUserByReferralID(referralID);
    if (!user) {
      throw new Error('Invalid ID.');
    }
    return user
  } catch (error) {
    throw new Error(error.message || 'User not found.');
  }
}


// Generate a secure random token
function generateResetToken() {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
}


//******************************************************************/ 
// FORGOT PASSWORD
//******************************************************************/ 
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
    const mailOptions = {
      from: 'claims@greenbackclaims.com',
      to: email,
      subject: 'Password Reset',
      html: emailTemplates.forgotPasswordEmailTemplate( process.env.FRONTEND_APP_URL,resetToken)
    };

    await emailService.sendEmail(mailOptions)

    return resetToken; // Return the token for testing purposes or further use
  } catch (error) {
    throw new Error(error.message || 'Forgot password failed.');
  }
}


//******************************************************************/ 
// RESET PASSWORD
//******************************************************************/ 
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


//******************************************************************/ 
// FORGOT USERNAME
//******************************************************************/ 
async function forgotUsername(email) {
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }
    const username = user.username;
    const mailOptions = {
      from: 'claims@greenbackclaims.com',
      to: email,
      subject: 'Your Username',
      html: emailTemplates.forgotUsernameEmailTemplate( process.env.FRONTEND_APP_URL,username)
    };

    await emailService.sendEmail(mailOptions)
  } catch (error) {
    throw new Error(error.message || 'Forgot username failed.');
  }
}



module.exports = {
  createRole,
  signup,
  login,
  findUserByID,
  forgotPassword,
  forgotUsername,
  resetPassword,
  findUserByReferralID
};
