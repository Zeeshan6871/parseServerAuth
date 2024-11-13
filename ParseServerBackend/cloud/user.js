Parse.Cloud.define('validateUsername', async (request) => {
    const username = request.params.username;
    try {
      const query = new Parse.Query(Parse.User);
      query.equalTo('username', username);
      const user = await query.first({ useMasterKey: true });  // Use master key to query user
      if (user) {
        return { message: "Username found, please enter a new password." };
      } else {
        throw new Error("Username not found.");
      }
    } catch (error) {
      throw new Error("Error checking username: " + error.message);
    }
  });
  
  Parse.Cloud.define('resetUserPassword', async (request) => {
    const username = request.params.username;
    const newPassword = request.params.newPassword;
    try {
      const query = new Parse.Query(Parse.User);
      query.equalTo('username', username);
      const user = await query.first({ useMasterKey: true });  // Use master key to query user
      
      if (user) {
        user.set('password', newPassword);  // Set new password
        await user.save(null, { useMasterKey: true });  // Use master key to save the user
        return { success: true, message: 'Password reset successful.' };
      } else {
        throw new Error('User not found');
      }
  
    } catch (error) {
      throw new Error(error.message);
    }
  });
  