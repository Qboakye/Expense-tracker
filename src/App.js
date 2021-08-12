import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "./redux/actions/authActions/fetchUser";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import Loading from "./components/Loading";

function App({ fetchInfo, user, loading }) {
  useEffect(() => {
    const subscribe = fetchInfo();
    return subscribe;
  }, [fetchInfo, user]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {!user ? <Home /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/sign-up">
            {!user ? <Home /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/dashboard">
            {user ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/reports">
            {user ? <Reports /> : <Redirect to="/" />}
          </Route>
          <Route path="/transactions">
            {user ? <Transactions /> : <Redirect to="/" />}
          </Route>
          <Route path="/settings">
            {user ? <Settings /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: () => dispatch(fetchUser()),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
