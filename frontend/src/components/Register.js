import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../services/auth.service";

const Register = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        password: "",
        confirmPassword: "",
        phone: "",
        email: "",
        country: "india",
        address: "",
        gender: "male",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username) {
            navigate("/");
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Check for required fields
        Object.keys(formData).forEach((field) => {
            if (formData[field] === "" || formData[field] === null) {
                isValid = false;
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
            }
        });

        // Validate email format
        if (formData.email && !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formData.email)) {
            isValid = false;
            newErrors.email = "Please enter a valid email.";
        }

        // Validate mobile number format (example: 10 digits, may be prefixed with a + or country code)
        if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) {
            isValid = false;
            newErrors.phone = "Please enter a valid mobile number.";
        }

        // Check if passwords match
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            isValid = false;
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setValidated(true);

        // console.log(formData);
        // console.log(errors);

        if (validateForm()) {
            const regobj = { ...formData };

            setLoading(true);

            console.log("valid data",formData);

            signupUser(regobj)
                .then((data) => {
                    toast.success("Registered successfully.");
                    navigate("/login");
                })
                .catch((err) => {
                    toast.error("Failed: " + err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="card">
                            <div className="card-header text-center">
                                <h2>User Registration</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3 text-start fw-semibold">
                                        <label className="form-label">Username</label>
                                        <span className="text-danger ms-1">*</span>
                                        <input
                                            type="text"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleInputChange}
                                            className={`form-control ${validated && errors.id ? "is-invalid" : ""}`}
                                            placeholder="Username"
                                            required
                                        />
                                        {validated && errors.id && <div className="invalid-feedback">{errors.id}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3 text-start fw-semibold">
                                        <label className="form-label">Full Name</label>
                                        <span className="text-danger ms-1">*</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Fullname"
                                            className={`form-control ${validated && errors.name ? "is-invalid" : ""}`}
                                            required
                                        />
                                        {validated && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                </div>

                                

                                <div className="row">
                                    <div className="col-md-6 mb-3 text-start fw-semibold">
                                        <label className="form-label">Email</label>
                                        <span className="text-danger ms-1">*</span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email"
                                            className={`form-control ${validated && errors.email ? "is-invalid" : ""}`}
                                            required
                                        />
                                        {validated && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    {/* Phone Number Section */}
                                    <div className="col-md-6 text-start fw-semibold">
                                        <div className="mb-3">
                                            <label className="form-label">Phone No.</label>
                                            <span className="text-danger ms-1">*</span>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Mobile Number"
                                                className={`form-control ${validated && errors.phone ? "is-invalid" : ""}`}
                                                required
                                            />
                                            {validated && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                        </div>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3 text-start fw-semibold">
                                        <label className="form-label">Password</label>
                                        <span className="text-danger ms-1">*</span>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Password"
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
                                        {validated && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3 text-start fw-semibold">
                                        <label className="form-label">Confirm Password</label>
                                        <span className="text-danger ms-1">*</span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm Password"
                                            className={`form-control ${validated && errors.confirmPassword ? "is-invalid" : ""}`}
                                            required
                                        />
                                        {validated && errors.confirmPassword && (
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    {/* Country */}
                                    <div className="col-md-6 mb-3 text-start fw-semibold">
                                        <label className="form-label">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                        {validated && errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                    </div>

                                    {/* Gender Section */}
                                    <div className="col-md-6 text-start fw-semibold ">
                                        <label className="form-label me-4">Gender</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === "male"}
                                                    onChange={handleInputChange}
                                                    className="form-check-input"
                                                />
                                                <label className="form-check-label">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === "female"}
                                                    onChange={handleInputChange}
                                                    className="form-check-input"
                                                />
                                                <label className="form-check-label">Female</label>
                                            </div>
                                            {validated && errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 text-start fw-semibold">
                                    <label className="form-label">Address</label>
                                    <span className="text-danger ms-1">*</span>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        placeholder="Enter your full address here"
                                        onChange={handleInputChange}
                                        className={`form-control ${validated && errors.address ? "is-invalid" : ""}`}
                                        required
                                    />
                                    {validated && errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>
                                
                            </div>

                            <div className="p-4 text-center">
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : "Register"}
                                </button>
                            </div>
                            <div className="text-center mb-2">
                                <Link to="/login" className="btn btn-link">
                                    Already have an account?
                                </Link>
                                <Link to="/forget-password" className="btn btn-link ms-2">
                                    Forget Password?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
