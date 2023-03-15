import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input, Alert } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import {
  RegisterAction,
  clearAuthErrorAction,
} from "./../../../store/actions/Auth";
import Spinner from "react-loader-spinner";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      phone: "",
      password: "",
    };
  }
  componentDidMount() {
    this.props.clearAuthErrorAction();
  }
  componentDidUpdate(pros) {
    if (this.props.authError !== pros.authError)
      if (this.props.authError) {
        Alert.warning(this.props.authError);
        this.props.clearAuthErrorAction();
      }
  }
  render() {
    return (
      <div>
        <div className="rent_opion for_input ">
          <div className="Op_head">Full Name</div>
          <Input
            type={"email"}
            size="md"
            className="optional_input"
            placeholder="Enter full name"
            onChange={(e) => {
              this.setState({
                full_name: e,
              });
            }}
            id={"full_name"}
            value={this.state.full_name}
            defaultValue={this.state.full_name}
            disabled={this.props.authLoading}
          />
        </div>
        <div className="rent_opion for_input">
          <div className="Op_head">Email</div>
          <Input
            type={"email"}
            size="md"
            className="optional_input"
            placeholder="Enter email"
            onChange={(e) => {
              this.setState({
                email: e,
              });
            }}
            id={"email"}
            value={this.state.email}
            defaultValue={this.state.email}
            disabled={this.props.authLoading}
          />
        </div>

        <div className="rent_opion for_input">
          <div className="Op_head">Phone Number</div>
          <Input
            type={"number"}
            size="md"
            className="optional_input"
            placeholder="Enter phone number"
            onChange={(e) => {
              this.setState({
                phone: e,
              });
            }}
            id={"email"}
            value={this.state.phone}
            defaultValue={this.state.phone}
            disabled={this.props.authLoading}
          />
        </div>
        <div className="rent_opion for_input">
          <div className="Op_head">Password</div>
          <Input
            type={"password"}
            size="md"
            className="optional_input"
            placeholder="Enter password"
            onChange={(e) => {
              this.setState({
                password: e,
              });
            }}
            id={"email"}
            value={this.state.password}
            defaultValue={this.state.password}
            disabled={this.props.authLoading}
          />
        </div>
        {this.props.authLoading ? (
          <Button
            disabled
            className={`balm w-100 heart text-center mt-2 butas bg-success`}
          >
            <Spinner
              width="9.5"
              className="mx-auto"
              height="9.5"
              color="white"
              type="ThreeDots"
            />
          </Button>
        ) : (
          <Button
            className={`balm text-center mt-2 butas bg-success`}
            onClick={() => {
              let { full_name, email, phone, password } = this.state;

              if (full_name && email && phone && password) {
                if (password.length < 6) {
                  Alert.warning(
                    "Password show be greater than 6 charaters",
                    5000
                  );
                } else if (phone.length < 11 || phone.length > 11) {
                  Alert.warning("Phone number should be 11 digits.", 5000);
                } else if (EmailTest(email) === false) {
                  Alert.warning("Enter a valid email address.", 5000);
                } else {
                  this.props.RegisterAction({
                    full_name,
                    email,
                    phone,
                    password,
                  });
                }
              } else {
                Alert.warning("Please all fields.", 5000);
              }
            }}
            appearance="subtle"
            ripple={true}
            style={{ width: "100%", borderRadius: "6px", borderWidth: 2 }}
          >
            <span
              style={{ fontVariant: "small-caps" }}
              className="text-white op_button_next small"
            >
              Register
            </span>
          </Button>
        )}
      </div>
    );
  }
}

export function EmailTest(d) {
  let email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.test(d);
}
const mapStateToProps = (state) => ({
  authLoading: state.user.isLoading,
  authError: state.user.errorMsg,
});

const mapDispatchToProps = {
  RegisterAction,
  clearAuthErrorAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
