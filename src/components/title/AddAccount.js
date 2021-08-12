import { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "../../css/addAccount.css";
import { walletAdder } from "../../redux/actions/dbActions/walletAdder";

function AddAccount({ setIsOpened, addWallet }) {
  const [values, setValues] = useState({
    accountName: "",
    amount: "",
    default: false,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(values.accountName && values.amount)) {
      return setError("Kindly Fill all fields");
    }
    setError("");
    addWallet({ ...values, id: uuidv4() });
    setIsOpened(false);
  };

  return (
    <div className="overlay-container">
      <div className="add-account-container">
        <button className="close" onClick={() => setIsOpened(false)}>
          <svg className="close-btn" viewBox="0 0 47.971 47.971">
            <path
              d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
		c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
		C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
		s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
            />
          </svg>
        </button>
        <div className="img-box"></div>
        <form onSubmit={handleSubmit}>
          <p style={{ textAlign: "center" }}>{error}</p>
          <div className="account-name">
            <label htmlFor="account">Account Name</label>
            <input
              id="account"
              name="accountName"
              value={values.accountName}
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="initial-amount">
            <label htmlFor="amount">Initial Amount</label>
            <input
              id="amount"
              name="amount"
              value={values.amount}
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="default-box">
            <label htmlFor="default">
              <input
                id="default"
                name="default"
                type="checkbox"
                checked={values.default}
                onChange={handleChange}
              />
              Set as default
            </label>
          </div>
          <div className="account-submit-btn">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addWallet: (values) => {
      dispatch(walletAdder(values));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddAccount);
