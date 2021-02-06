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
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function RegisterModal(props) {
  const { error, isAuthenticated } = props;

  const [modal, setModal] = useState(false);

  const [registerState, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    msg: null,
  });

  // const propTypes = {
  //   isAuthenticated: PropTypes.bool,
  //   error: PropTypes.object.isRequired,
  //   register: PropTypes.func.isRequired,
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

    const { name, email, password } = registerState;

    // Create user object
    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    props.register(newUser);
  };

  return (
    <div>
      <NavLink onClick={toggle} to="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {registerState.msg ? (
            <Alert color="danger">{registerState.msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
                className="mb-3"
              ></Input>
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
                Register
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

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
