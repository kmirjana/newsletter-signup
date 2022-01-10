//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();
const appKey = process.env.APP_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
  console.log("Your server is up and running");
});

app.post("/", (req, res) => {
  const firstName = req.body.f;
  const lastName = req.body.l;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fileds: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/a0a1c0cd64";

  const options = {
    method: "POST",
    auth: "mirjana1:bdef86ca9ccca85d98e4f835bd1b0bdc-us20",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure", (req, res) => {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running at port 3000");
});
// app-key

// 5b8f05d78d73d635e91b836e7d6e4b40-us20

// bdef86ca9ccca85d98e4f835bd1b0bdc-us20
//list id
//a0a1c0cd64
