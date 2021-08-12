import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUserUp } from "../redux/actions/authActions/signUserUp";

function SignUp({ signup, connectErr }) {
  const [details, setDetails] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(details.email && details.password && details.confirmPassword)) {
      return setError("Kindly Fill all fields");
    }
    if (details.password.length < 6) {
      return setError("Password must be atleast 6 characters");
    }
    if (details.password !== details.confirmPassword) {
      return setError("Passwords do not match");
    }
    setError("");

    signup(details);
    setDetails({});
  };

  return (
    <main className="home-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <p className="error-box">{error}</p>
        <p className="error-box">{connectErr}</p>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <div className="account">
          <label htmlFor="account">Account Name</label>
          <input
            type="text"
            id="account"
            name="account"
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="confirm-password">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <div className="signup-btn">
          <button>Sign Up</button>
        </div>
        <small>
          Already have an account? <Link to="/">Log In</Link>
        </small>
      </form>
    </main>
  );
}
const mapStateToProps = (state) => {
  return {
    connectErr: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (details) => {
      dispatch(signUserUp(details));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
