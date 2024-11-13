const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const cors = require("cors")
const app = express();
require("dotenv").config();
const parseDashBoard = require("parse-dashboard")
const BASE_URL = "http://localhost:1337/parse"
// const BASE_URL = "https://parseserverauth.onrender.com"

app.use(cors());

const dashboard = new parseDashBoard({
    "apps": [
    {
      "serverURL": BASE_URL,
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ],
    "users": [
      {
        "user":"user1",
        "pass":"pass"
      }
    ]
  })

  // console.log(process.env.MONGODB_URI);
  

const server = new ParseServer({
  databaseURI: process.env.MONGODB_URI ||  'mongodb://localhost:27017/dev', 
  cloud: './cloud/main.js', // Path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', 
  fileKey: 'optionalFileKey', 
  serverURL: BASE_URL, 
  allowClientClassCreation:true,
  encodeParseObjectInCloudFunction:true
});

// Start server
server.start();

// Serve the Parse API on the /parse URL prefix
app.use('/parse', server.app);
app.use("/dashboard",dashboard)

app.listen(1337, function() {
  console.log(`parse-server-example running on port 1337. ${BASE_URL}`);
});