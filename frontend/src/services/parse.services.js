import Parse from 'parse';

// Initialize Parse with your app's configuration
Parse.initialize(process.env.REACT_APP_PARSE_APP_ID || "myAppId");
Parse.serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/parse';

// console.log(process.env.REACT_APP_PARSE_APP_ID,process.env.REACT_APP_SERVER_URL );


export const signupUser = async ({ id, name, password, email, country, address, gender }) => {
  const user = new Parse.User();

  user.set({username: id,name,password,email,country,address,gender
  });

  try {
    // Attempt to sign up the user
    await user.signUp();

    // On successful registration
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error(error.message);
  }
};

export const loginUser = async (username, password) => {
  try {

    const user = await Parse.User.logIn(username, password);
    return { success: true, message: "Login Successful", user };
  } catch (error) {
    if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
      throw new Error("User not found.");
    } else if (error.code === Parse.Error.INVALID_SESSION_TOKEN) {
      throw new Error("Session expired, please log in again.");
    } else {
      throw new Error(error.message || "Login failed.");
    }
  }
};

// Validate Username via Cloud Code
export const validateUsername = async (username) => {
  try {
    const response = await Parse.Cloud.run('validateUsername', { username });
    console.log(response);
    return response; // { message: "Username found, please enter a new password." }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Reset Password via Cloud Code
export const resetUserPassword = async (username, newPassword) => {
  try {
    const response = await Parse.Cloud.run('resetUserPassword', { username, newPassword });
    console.log(response);
    return response; // { success: true, message: 'Password reset successful.' }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};


export const handleParseLogout = async () => {
        try {
            await Parse.User.logOut(); // Log out using Parse Server
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


