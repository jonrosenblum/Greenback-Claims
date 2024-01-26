const express = require('express');
const multer = require('multer');
const cors = require('cors');
const db = require('./models/User');
const emailController = require('./controllers/emailController');
const contactUsController = require('./controllers/contactUsController');
const authController = require('./controllers/authController');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.post('/send-email', upload.single('pdf'), emailController.sendEmail);
app.post('/contact-us', upload.single('pdf'), contactUsController.contactUs);
app.post('/signup', authController.signup);
app.post('/login', authController.login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});