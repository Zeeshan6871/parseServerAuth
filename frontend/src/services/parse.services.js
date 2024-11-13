import Parse from 'parse';

// Initialize Parse with your app's configuration
Parse.initialize(process.env.REACT_APP_PARSE_APP_ID || "myAppId");
Parse.serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/parse';

console.log(process.env.REACT_APP_PARSE_APP_ID,process.env.REACT_APP_SERVER_URL );


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

// Validate Username (Check if user exists)
export const validateUsername = async (formData) => {
  const { username } = formData;

  
  try {
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', username);
    const user = await query.first();    
    if (user) {
      return { message: "Username found, please enter a new password." };
    } else {
      throw new Error("Username not found.");
    }
    
  } catch (error) {
    throw new Error("Error checking username: " + error.message);
  }
};

// Reset User Password
export const resetUserPassword = async (username, newPassword) => {
  try {
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', username);
    const user = await query.first();
    
    if (user) {
      user.set('password', newPassword);  // Set new password
      await user.save();
      
      return { success: true, message: 'Password reset successful.' };
    } else {
      throw new Error('User not found');
    }

  } catch (error) {
    throw new Error(error.message);
  }
};

export const handleParseLogout = async () => {
        try {
            await Parse.User.logOut(); // Log out using Parse Server
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


