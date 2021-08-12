import "../../css/side.css";
import { connect } from "react-redux";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { currencyChanger } from "../../redux/actions/projectActions/currencyChanger";

function Side({ changeCurrency, currency }) {
  const handleChange = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <section className="side-widget">
      <div>
        <Calendar />
      </div>

      <div className="currency-box">
        <select onChange={handleChange} value={currency}>
          <option value="$">USD</option>
          <option value="₵">CEDI</option>
          <option value="£">POUND</option>
        </select>
      </div>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currency) => {
      dispatch(currencyChanger(currency));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    currency: state.project.currency,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Side);
