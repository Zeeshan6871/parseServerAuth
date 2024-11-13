// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { resetUserPassword, validateUsername } from "../services/parse.services";

// const ResetPasswordPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
//   const [errors, setErrors] = useState({ username: "", password: "", confirmPassword: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const [isUsernameValid, setIsUsernameValid] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const usenavigate = useNavigate();

//   useEffect(() => {
//     let username = sessionStorage.getItem("username");
//     if (username) {
//       usenavigate("/");
//     }
//   }, [usenavigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setValidated(true);
//     setErrors({ username: "", password: "", confirmPassword: "" });

//     if (validate()) {
//       if (isUsernameValid) {
//         const { username, password } = formData;
//         setIsLoading(true)
//         resetUserPassword(username, password)
//           .then((resp) => {
//             toast.success(resp.message);
//             usenavigate("/login");
//           })
//           .catch((err) => {
//             toast.error("Reset Password Failed: " + err.message);
//           }).finally(() => {
//             setIsLoading(false);
//           });
//       }
//     }
//   };

//   const validate = () => {
//     let isValid = true;
//     let newErrors = {};

//     if (!formData.username) {
//       newErrors.username = "Please enter a username.";
//       isValid = false;
//     }

//     if (isUsernameValid && !formData.password) {
//       newErrors.password = "Please enter a new password.";
//       isValid = false;
//     }

//     if (isUsernameValid && formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleValidateUsername = () => {
//     setIsLoading(true)
//     validateUsername(formData)
//       .then((res) => {
//         setIsUsernameValid(true);
//         toast.success("Username found, please enter a new password.");
//       }).catch(() => {
//         setIsUsernameValid(false);
//         toast.error("Username not found.");
//       }).finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
//       <div className="row justify-content-center w-100">
//         <div className="col-md-8 col-lg-6">
//           <form onSubmit={handleSubmit} noValidate>
//             <div className="card">
//               <div className="card-header text-center">
//                 <h2>Reset Password</h2>
//               </div>
//               <div className="card-body">
//                 {/* Username Field */}
//                 <div className="form-group mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Username <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     onBlur={handleValidateUsername}
//                     placeholder="Username"
//                     className={`form-control ${validated && errors.username ? "is-invalid" : ""}`}
//                     required
//                     disabled={isUsernameValid}
//                   />
//                   {validated && errors.username && (
//                     <div className="invalid-feedback">{errors.username}</div>
//                   )}
//                 </div>

//                 {/* Password Field (Only shows if username is valid) */}
//                 {isUsernameValid && (
//                   <>
//                     <div className="form-group mb-3">
//                       <label htmlFor="password" className="form-label">
//                         New Password <span className="text-danger">*</span>
//                       </label>
//                       <div className="input-group">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           id="password"
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           placeholder="New Password"
//                           className={`form-control ${validated && errors.password ? "is-invalid" : ""}`}
//                           required
//                         />
//                         <button
//                           type="button"
//                           className="input-group-text"
//                           onClick={togglePasswordVisibility}
//                         >
//                           {showPassword ? "🔓" : "🔒"}
//                         </button>
//                       </div>
//                       {validated && errors.password && (
//                         <div className="invalid-feedback">{errors.password}</div>
//                       )}
//                     </div>

//                     <div className="form-group mb-3">
//                       <label htmlFor="confirmPassword" className="form-label">
//                         Confirm Password <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         placeholder="Confirm Password"
//                         className={`form-control ${validated && errors.confirmPassword ? "is-invalid" : ""}`}
//                         required
//                       />
//                       {validated && errors.confirmPassword && (
//                         <div className="invalid-feedback">{errors.confirmPassword}</div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div className="text-center p-4">
//                 <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
//                   {isLoading ? <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div> : "Reset Password"}
//                 </button>
//               </div>
//               <div className="text-center">
//                 <Link className="btn btn-link" to="/login">
//                   Remembered your password? Login
//                 </Link>
//                 <Link className="btn btn-link ms-2" to="/register">
//                   Register new user
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default ResetPasswordPage;




import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUserPassword, validateUsername } from "../services/parse.services";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ username: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      navigate("/"); // Redirect to homepage if user is already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    setErrors({ username: "", password: "", confirmPassword: "" });

    if (validate()) {
      if (isUsernameValid) {
        const { username, password } = formData;
        setIsLoading(true);
        resetUserPassword(username, password)
          .then((resp) => {
            toast.success(resp.message);
            navigate("/login");
          })
          .catch((err) => {
            toast.error("Reset Password Failed: " + err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.username) {
      newErrors.username = "Please enter a username.";
      isValid = false;
    }

    if (isUsernameValid && !formData.password) {
      newErrors.password = "Please enter a new password.";
      isValid = false;
    }

    if (isUsernameValid && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleValidateUsername = () => {
    setIsLoading(true);
    validateUsername(formData.username) // Pass only the username
      .then((res) => {
        setIsUsernameValid(true);
        toast.success("Username found, please enter a new password.");
      })
      .catch((err) => {
        setIsUsernameValid(false);
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="card">
              <div className="card-header text-center">
                <h2>Reset Password</h2>
              </div>
              <div className="card-body">
                {/* Username Field */}
                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleValidateUsername} // Trigger validation when leaving the field
                    placeholder="Username"
                    className={`form-control ${validated && errors.username ? "is-invalid" : ""}`}
                    required
                    disabled={isUsernameValid}
                  />
                  {validated && errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                {/* Password Field (Only shows if username is valid) */}
                {isUsernameValid && (
                  <>
                    <div className="form-group mb-3">
                      <label htmlFor="password" className="form-label">
                        New Password <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="New Password"
                          className={`form-control ${validated && errors.password ? "is-invalid" : ""}`}
                          required
                        />
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? "🔓" : "🔒"}
                        </button>
                      </div>
                      {validated && errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className={`form-control ${validated && errors.confirmPassword ? "is-invalid" : ""}`}
                        required
                      />
                      {validated && errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center p-4">
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
              <div className="text-center">
                <Link className="btn btn-link" to="/login">
                  Remembered your password? Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
