import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../../actions/authActions";

function Logout(props) {
  return (
    <Fragment>
      <NavLink onClick={props.logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
}

export default connect(null, { logout })(Logout);
