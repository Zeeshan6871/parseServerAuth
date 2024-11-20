import Parse from 'parse';

// Initialize Parse with your app's configuration
Parse.initialize(process.env.REACT_APP_PARSE_APP_ID);
Parse.serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:1337/parse";

// console.log(process.env.REACT_APP_PARSE_APP_ID,process.env.REACT_APP_SERVER_URL );
export default Parse;