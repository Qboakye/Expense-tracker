import NavBar from "../components/layout/NavBar";
import Side from "../components/layout/Side";
import Account from "../components/settings/Account";

function Settings() {
  return (
    <>
      <NavBar />
      <Account title="Account and Security" />
      <Side />
    </>
  );
}

export default Settings;
