import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../redux/actions/authActions/fetchUser";
import { logUserIn } from "../redux/actions/authActions/logUserIn";

function Login({ login, connectErr }) {
  const [details, setDetails] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(details.email && details.password)) {
      return setError("Kindly Fill all fields");
    }
    if (details.password.length < 6) {
      return setError("Password must be atleast 6 characters");
    }
    setError("");
    login(details);
    setDetails({});
  };

  return (
    <main className="home-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <p className="error-box">{error}</p>
        <p className="error-box">{connectErr}</p>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
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
        <div className="login-btn">
          <button>Log in</button>
        </div>
        <small>
          Need a new account <Link to="/sign-up">Sign up</Link>
        </small>
      </form>
    </main>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (details) => {
      dispatch(logUserIn(details));
    },
    fetchInfo: () => dispatch(fetchUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    connectErr: state.auth.authError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
