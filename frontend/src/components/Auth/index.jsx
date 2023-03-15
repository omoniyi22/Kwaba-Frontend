import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Register from "./Register";

export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { auth_state: false };
  }
  render() {
    return (
      <div className=" rent">
        <div className="rent_stages  ">
          <div className="rent_title">{this.state.postionTitle}</div>
          <div className="rent_ratio foen heart flex ml-auto">
            <div className="rent_content">
              <div className="my_rent_auth">
                <div className="auth_title">SignUp</div>
                <div className="auth_container">
                  {this.state.auth_state === false ? <Register /> : <Login />}
                </div>
                <div
                  className="switch_auth text-center"
                  onClick={() => {
                    this.setState({ auth_state: !this.state.auth_state });
                  }}
                >
                  <div
                    className="py-3 pnt"
                    onClick={() => {
                      this.setState({ auth_state: !this.state.auth_state });
                    }}
                  >
                    {this.state.auth_state === false ? "Are you registered ? Login" : "New to Kwaba? Register now"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
