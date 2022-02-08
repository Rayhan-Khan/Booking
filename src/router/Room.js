const express = require("express");
const { createroom, getRoom, singleRoom, alltype } = require("../controller/Room");
const upload = require("../controller/fileUpload");

const { userExist } = require("../controller/isLoggedin");
const Admin = require("../controller/Admin");
const router = express.Router();

const cpUpload = upload.fields([
  { name: "coverPhoto", maxCount: 1 },
  { name: "RoomPhoto" },
]);
router
      .post("/createroom", userExist,Admin, cpUpload, createroom)
      .get('/getallroom',getRoom)
      .get('/singleroom/:id',singleRoom)
      .get('/alltype',alltype)

module.exports = router;
