const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const cors = require("cors")
const app = express();
require("dotenv").config();
const parseDashBoard = require("parse-dashboard")
const BASE_URL = process.env.BASE_URL;

app.use(cors());

const dashboard = new parseDashBoard({
    "apps": [
    {
      "serverURL": BASE_URL,
      "appId": process.env.APP_ID,
      "masterKey":process.env.MASTER_KEY ,
      "appName":process.env.APP_NAME,
      "serverURL": BASE_URL,
    }
  ],
    "users": [
      {
        "user":process.env.DASHBOARD_USER,
        "pass":process.env.DASHBOARD_PASSWORD
      }
    ]
  })

  // console.log(process.env.MONGODB_URI);
  

const server = new ParseServer({
  databaseURI: process.env.DB_URI ||  'mongodb://localhost:27017/dev', 
  cloud: './cloud/main.js', // Path to your Cloud Code
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY , 
  fileKey: process.env.FILE_KEY, 
  serverURL: BASE_URL,
  publicServerURL:BASE_URL,
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