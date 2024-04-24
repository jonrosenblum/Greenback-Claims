require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { Pool } = require("pg");
const authController = require("./controllers/authController");
const emailController = require("./controllers/emailController");
const saveFormController = require("./controllers/saveFormController");
const countController = require('./controllers/countController');
const adminController = require("./controllers/adminController");
const { initializeDatabase } = require("./db");


const app = express();

app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "https://www.greenbackclaims.com",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// init DB
initializeDatabase();
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", async (req, res) => {
  try {
    res.send(`API healthy!!`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/initialize-db", async (req, res) => {
  try {
    // init DB
    initializeDatabase();
    res.send(`Database initialize!!`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use("/api/auth/", authController);
app.post('/api/saveFormData', saveFormController.saveFormDataController);
app.post("/send-email", upload.single("pdf"), emailController.sendEmail);
app.post("/send-referral-email", emailController.sendReferralEmail);
app.get('/api/submissions/:referralID', countController.getMatchingSubmissionsController);
app.post('/api/update-referral-frequency/:referralID', countController.updateReferralFrequencyCount);
app.use("/api/admin/", adminController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
