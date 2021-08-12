import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { filterChanger } from "../../redux/actions/projectActions/filterChanger";

function FilterSelector({ filter, changeFilter }) {
  const [value, setValue] = useState(filter);
  const handleChange = (event) => changeFilter(event.target.value);

  useEffect(() => {
    setValue(filter);
  }, [filter]);

  return (
    <select value={value} onChange={handleChange}>
      <option value="overall">Overall</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  );
}

const mapStateToProps = (state) => {
  return { filter: state.project.filter };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilter: (filter) => {
      dispatch(filterChanger(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelector);
