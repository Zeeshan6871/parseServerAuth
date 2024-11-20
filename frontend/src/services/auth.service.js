import  Parse  from "./parse.services.js"

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
  
  export const handlePasswordReset = async (email) => {
    // console.log(email);
    try {
      await Parse.User.requestPasswordReset(email);
      return {error:false,message:"Successfully sent the email"}
    } catch (err) {
      console.log(err?.message);
      throw new Error(err.message);
    }
  };
  
  
  export const handleParseLogout = async () => {
          try {
              await Parse.User.logOut();
          } catch (error) {
              console.error('Logout error:', error);
          }
      };
  
  
  