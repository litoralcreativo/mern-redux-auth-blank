import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function LoginModal(props) {
  const { error, isAuthenticated } = props;

  const [modal, setModal] = useState(false);

  const [loginState, setRegister] = useState({
    email: "",
    password: "",
    msg: null,
  });

  // const propTypes = {
  //   isAuthenticated: PropTypes.bool,
  //   error: PropTypes.object.isRequired,
  //   login: PropTypes.func.isRequired,
  //   clearErrors: PropTypes.func.isRequired,
  // };

  const toggle = useCallback(() => {
    // Clear errors
    props.clearErrors();
    setModal(!modal);
  }, [props, modal]);

  useEffect(() => {
    // If authenticated close modal
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [isAuthenticated, modal, toggle]);

  useEffect(() => {
    if (error.id !== null) {
      setRegister((prevState) => ({ ...prevState, msg: error.msg.msg }));
    } else {
      setRegister((prevState) => ({ ...prevState, msg: null }));
    }
  }, [error]);

  const onChange = (e) => {
    const target = e.target;
    let val = e.target.value;
    switch (target.id) {
      case "name":
        setRegister((prevState) => ({ ...prevState, name: val }));
        break;
      case "email":
        setRegister((prevState) => ({ ...prevState, email: val }));
        break;
      case "password":
        setRegister((prevState) => ({ ...prevState, password: val }));
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginState;

    // Create user object
    const user = {
      email,
      password,
    };

    // Attempt to login
    props.login(user);
  };

  return (
    <div>
      <NavLink onClick={toggle} to="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {loginState.msg ? (
            <Alert color="danger">{loginState.msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                className="mb-3"
              ></Input>
              <Label for="password">Name</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                className="mb-3"
              ></Input>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
