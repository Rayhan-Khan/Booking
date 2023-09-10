require("dotenv").config();
/* const cors = require("cors"); */
const express = require("express");
const helmet = require("helmet");
const app = express();
const admin = express();
const mongoose = require("mongoose");
const path = require("path");
const cookie = require("cookie-parser");
const auth = require("./router/auth");
const isUserexist = require("./router/isLoggedin");
const errorHandaler = require("./controller/Error");
const NotFound = require("./controller/NotFound");
const createRoom = require("./router/Room");
const booking = require("./router/booking");



app.use('/public', express.static(path.join(__dirname,'uploads')))
/* 
app.use("/public", express.static(__dirname, +"/uploads")); */
/* app.use(
  cors({ credentials: true, origin: "http://localhost:3000" })
); */
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookie());

//app.use("/admin", admin);
app.use('/api',isUserexist);
//admin.use('/api',createRoom);
app.use('/api',createRoom);
app.use('/api',auth);
app.use('/api',booking);
app.use('/api',NotFound);
app.use('/api',errorHandaler);


mongoose
  .connect(`${process.env.MONGO_CONNECTION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connectted"))
  .catch((err) => console.log(err));
  app.use(express.static(path.join(__dirname, "my-app","build")));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'my-app','build', 'index.html'));
  });

/* if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./my-app/build")));
  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./my-app/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}  */

const Port = process.env.PORT || 2000;

const server = app.listen(Port, () => {
  console.log(`Example app listening at${Port}`);
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
