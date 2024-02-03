require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { Pool } = require("pg");
const authController = require("./controllers/authController");
const emailController = require("./controllers/emailController");
const saveFormController = require("./controllers/saveFormController");
const countController = require('./controllers/countController');


const app = express();

app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "https://www.greenbackclaims.com",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Set up a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

// Use the connection pool for queries
app.locals.pool = pool;

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
    const data = result.rows[0].message;
    client.release();
    res.send(`API healthy: ${data}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use("/api/auth/", authController);
app.post('/api/saveFormData', saveFormController.saveFormDataController);
app.post("/send-email", upload.single("pdf"), emailController.sendEmail);
app.post("/send-email", emailController.sendReferralEmail);
app.get('/api/submissions/:referralID', countController.getMatchingSubmissionsController);
app.post('/api/update-referral-frequency/:referralID', countController.updateReferralFrequencyCount);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
