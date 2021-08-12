import "../css/home.css";
import { withRouter } from "react-router-dom";

import Login from "../components/Login";
import SignUp from "../components/SignUp";

function Home(props) {
  if (props.match.path === "/") {
    return <Login />;
  } else {
    return <SignUp />;
  }
}

export default withRouter(Home);
