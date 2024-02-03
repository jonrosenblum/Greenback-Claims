require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const emailController = require("./controllers/emailController");

const app = express();

app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "https://www.greenbackclaims.com",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) =>
  res.send(
    "api healthy: " +
      JSON.stringify(
        {
          utc: new Date().toUTCString(),
          local: new Date().toLocaleString(),
        },
        null,
        2
      )
  )
);
app.post("/send-email", upload.single("pdf"), emailController.sendEmail);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
