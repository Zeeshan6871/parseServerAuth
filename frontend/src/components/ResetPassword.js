import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handlePasswordReset } from "../services/parse.services";

const ResetPasswordPage = () => {
  const [email,setEmail] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "", confirmPassword: "" });
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      navigate("/"); // Redirect to homepage if user is already logged in
    }
  }, [navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (validate()) {
        setIsLoading(true);
        handlePasswordReset(email)
          .then((resp) => {
            toast.success(resp.message);
            setTimeout(() => {
              navigate("/login");
            }, "2000");
          })
          .catch((err) => {
            toast.error("Reset Password Failed: " + err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (!email) {
      newErrors.email = "Please enter a email.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
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
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                    className={`form-control ${validated && errors.email ? "is-invalid" : ""}`}
                    required
                  />
                  {validated && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center p-4">
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Sent Reset password email"
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
