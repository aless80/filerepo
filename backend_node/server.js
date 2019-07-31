var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");
app.use(cors());
var storagePath = "public";

// Use files directory for storing files
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage }).single("file");

app.get("/upload", (req, res) => {
  console.log(req);
  res.end("Received a GET on /upload");
});
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log("Upload successful");
    const file = req.file;
    const meta = req.body;
    console.log('meta:', meta)
    return res.status(200).send(file);
  });
});

app.listen(8000, () => {
  console.log("App running on port 8000");
});
