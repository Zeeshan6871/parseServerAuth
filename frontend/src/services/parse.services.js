import Parse from 'parse';

// Initialize Parse with your app's configuration

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID,"");
Parse.serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:1337/parse";

// const liveQueryClient = new Parse.LiveQueryClient({
//     applicationId: process.env.REACT_APP_PARSE_APP_ID,
//     serverURL: process.env.REACT_APP_SERVER_URL,  // Same server URL as in backend
//     wsServerURL: 'ws://localhost:1337/parse',  // Ensure this points to the correct WebSocket URL
// });
  
// liveQueryClient.open(); 
 

// console.log(process.env.REACT_APP_PARSE_APP_ID,process.env.REACT_APP_SERVER_URL );
export default Parse;