const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
require("dotenv").config();
const parseDashBoard = require("parse-dashboard")

const dashboard = new parseDashBoard({
    "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
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

const server = new ParseServer({
  databaseURI:  'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
//   cloud: './cloud/main.js', // Path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
  allowClientClassCreation:true,
  encodeParseObjectInCloudFunction:true
});

// Start server
server.start();

// Serve the Parse API on the /parse URL prefix
app.use('/parse', server.app);
app.use("/dashboard",dashboard)

app.listen(1337, function() {
  console.log(`parse-server-example running on port 1337. http://localhost:1337/parse`);
});