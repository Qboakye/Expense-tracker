import { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "../../css/addItem.css";
import { itemAdder } from "../../redux/actions/dbActions/itemAdder";
import { itemEditer } from "../../redux/actions/dbActions/itemEditer";
import { filterDeterminer } from "../../utils/filterDeterminer";

let categoryData = [];

function AddItem({
  bankName,
  setIsOpened,
  addItem,
  bankStatements,
  editFlag,
  editItem,
  data = {},
  categories,
}) {
  const { id, name, date, category: cat, price } = data;
  const [values, setValues] = useState({
    filter: filterDeterminer(cat, categories) || "",
    category: cat || "",
    transactionName: name || "",
    transactionAmount: price || "",
    date: date || "",
  });
  const [error, setError] = useState("");

  const [category, setCategory] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, bankName, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !(
        values.category &&
        values.transactionName &&
        values.transactionAmount &&
        values.date
      )
    ) {
      return setError("Kindly Fill all fields");
    }

    setError("");
    if (editFlag) {
      editItem({ ...values, bankName, id });
    } else {
      addItem({ ...values, id: uuidv4() });
    }
    setIsOpened(false);
  };

  if (!values.filter) {
    categoryData = categories.income.concat(categories.expense);
    categoryData = [...new Set(categoryData)];
  } else {
    for (const key of Object.keys(categories)) {
      if (key === values.filter) {
        categoryData = [...new Set(categories[key])];
      }
    }
  }

  return (
    <div className="overlay-container">
      <div className="add-item-container">
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
          <p className="error-box">{error}</p>
          <div className="filter-category-container">
            <div>
              <label htmlFor="filter">Type</label>
              <select
                name="filter"
                value={values.filter}
                id="filter"
                onChange={handleChange}
              >
                <option value="">--pick a type--</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="category-selector">
              <label htmlFor="category">Category</label>
              {category ? (
                <select
                  name="category"
                  value={values.category}
                  id="category"
                  onChange={handleChange}
                >
                  <option value="">--pick a category--</option>
                  {categoryData.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                  <option
                    style={{ color: "white", backgroundColor: "black" }}
                    value=""
                    onClick={() => setCategory(false)}
                  >
                    Add new Category
                  </option>
                </select>
              ) : (
                <input
                  name="category"
                  id="category"
                  type="text"
                  onChange={handleChange}
                  placeholder="Add new Category"
                />
              )}
            </div>
          </div>
          <div className="transaction-container">
            <div className="transactionName-container">
              <label htmlFor="transactionName">Name</label>
              <input
                id="transactionName"
                name="transactionName"
                type="text"
                value={values.transactionName}
                onChange={handleChange}
              />
            </div>
            <div className="transactionAmount-container">
              <label htmlFor="transactionAmount">Amount</label>
              <input
                id="transactionAmount"
                name="transactionAmount"
                type="number"
                value={values.transactionAmount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="date-container">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleChange}
            />
          </div>
          <div className="item-submit-btn">
            <button>{editFlag ? "Edit" : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (value) => {
      dispatch(itemAdder(value));
    },
    editItem: (value) => {
      dispatch(itemEditer(value));
    },
  };
};

const mapStateToProps = (state) => {
  let selectedBank = state.project.allBanks.find(({ active }) => active);
  return {
    bankName: selectedBank.bankName,
    bankStatements: selectedBank.bankStatements,
    categories: state.project.categories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
