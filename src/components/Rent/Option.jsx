import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input, Alert } from "rsuite";
import Select from "react-select";
import "rsuite/dist/styles/rsuite-default.css";
import {
  ProfileUpdate,
  clearAuthErrorAction,
} from "./../../store/actions/Auth";
import Spinner from "react-loader-spinner";

let months = require("./months.json");

let CurrencyFormat = require("react-currency-format");

export class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accommodation_status: "",
      rent_amount: "",
      payment_duration: "",
      income: "",
      stage: 1,
      ...this.props.userData,
      payment_duration: {
        label: this.props.userData
          ? `${this.props.userData.payment_duration} Month`
          : "1 Month",
        value: this.props.userData
          ? `${this.props.userData.payment_duration} Months`
          : "1 Months",
      },
    };
    this.onChange = this.onChange.bind(this);
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <>
        <div className="headout opacy">
          {this.state.stage == 1 && (
            <div className="'opacy">
              <div className="rent_option ">
                <div className="Op_head">What's your accommodation status?</div>
                <Button
                  appearance="subtle"
                  className={`z-depth-0 text-center mt-2 butas  ${
                    this.state.accommodation_status ===
                      "Looking to renew my rent" && "bubuta"
                  }`}
                  onClick={() => {
                    this.setState({
                      accommodation_status: "Looking to renew my rent",
                    });
                  }}
                  ripple={true}
                  style={{ width: "100%", borderRadius: "6px", borderWidth: 2 }}
                >
                  <span className="op_button ">Looking to renew my rent</span>
                </Button>
                <Button
                  className={`z-depth-0 text-center mt-2 butas  ${
                    this.state.accommodation_status ===
                      "Want to pay for a new place" && "bubuta"
                  }`}
                  onClick={() => {
                    this.setState({
                      accommodation_status: "Want to pay for a new place",
                    });
                  }}
                  appearance="subtle"
                  ripple={true}
                  style={{ width: "100%", borderRadius: "6px", borderWidth: 2 }}
                >
                  <span className="op_button ">
                    Want to pay for a new place
                  </span>
                </Button>
                <Button
                  appearance="subtle"
                  className={`z-depth-0 text-center mt-2 butas mb-3  ${
                    this.state.accommodation_status === "I'm still searching" &&
                    "bubuta"
                  }`}
                  onClick={() => {
                    this.setState({
                      accommodation_status: "I'm still searching",
                    });
                  }}
                  ripple={true}
                  style={{ width: "100%", borderRadius: "6px", borderWidth: 2 }}
                >
                  <span className="op_button ">I'm still searching</span>
                </Button>
              </div>

              <div className="rent_opion for_input ">
                <div className="Op_head">
                  How much is your rent request amount?
                </div>
                <Input
                  type={"number"}
                  size="md"
                  className="optional_input"
                  placeholder="Amount"
                  onChange={(e) => {
                    this.setState({
                      rent_amount: e,
                    });
                  }}
                  id={"rent_amount"}
                  value={this.state.rent_amount}
                  defaultValue={this.state.rent_amount}
                />
              </div>
              <div className="rent_opion for_input">
                <div className="Op_head">How much did you earn monthly ?</div>
                <Input
                  type={"number"}
                  size="md"
                  className="optional_input"
                  placeholder="Amount"
                  onChange={(e) => {
                    this.setState({
                      income: e,
                    });
                  }}
                  id={"income"}
                  value={this.state.income}
                  defaultValue={this.state.income}
                />
              </div>
              <div className="rent_opion for_input">
                <div className="Op_head">Choose a monthly plan ?</div>
              </div>
              <Select
                className="optional"
                options={months}
                placeholder="Choose plan"
                onChange={(e) => {
                  console.log({ e });
                  this.setState({
                    payment_duration: e,
                  });
                }}
                name={"payment_duration"}
                value={this.state.payment_duration}
                defaultValue={this.state.payment_duration}
                style={{
                  border: "1px solid",
                  fontSize: "13px",
                }}
              />

              <Button
                className={`balm text-center mt-4 butas bg-success`}
                onClick={() => {
                  let {
                    accommodation_status,
                    income,
                    rent_amount,
                    payment_duration,
                  } = this.state;
                  console.log({
                    accommodation_status,
                    income,
                    rent_amount,
                    payment_duration,
                  });
                  if (
                    accommodation_status &&
                    income &&
                    rent_amount &&
                    payment_duration
                  ) {
                    this.setState({
                      stage: "2",
                    });
                    this.props.changeSecond();
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
                  Next
                </span>
              </Button>
            </div>
          )}
          {this.state.stage == "2" && (
            <div className="opacy">
              <div>
                <div className="rent_opion for_input ">
                  <div className="Op_head">Rent request amount</div>
                  <Input
                    size="md"
                    className="optional_input z-depth-1"
                    placeholder="Amount"
                    type={"number"}
                    onChange={(e) => {
                      this.setState({
                        rent_amount: e,
                      });
                    }}
                    id={"rent_amount"}
                    value={this.state.rent_amount}
                    defaultValue={this.state.rent_amount}
                  />
                </div>
                <div className="mt-4" />

                <div className="rent_opion for_input mt-3">
                  <div className="Op_head">Monthly payment plan</div>
                </div>
                <Select
                  className="optional"
                  style={{
                    border: "1px solid",
                    fontSize: "13px",
                  }}
                  options={months}
                  placeholder="Choose plan"
                  onChange={(e) => {
                    console.log({ e });
                    this.setState({
                      payment_duration: e,
                    });
                  }}
                  name={"payment_duration"}
                  value={this.state.payment_duration}
                  defaultValue={this.state.payment_duration}
                />
                <div className="mt-4" />
                <div className="rent_opion for_input mt-3">
                  <div className="Op_head">Payment option</div>

                  <div className="the_options border">
                    <div className="the_options_1 border-bottom flex heart">
                      <div className="pre_title">Pre-approved amount:</div>
                      <div className="pre_amount ml-auto">
                        <CurrencyFormat
                          value={this.state.rent_amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </div>
                    </div>
                    <div className="the_options_1 border-bottom flex heart">
                      <div className="pre_title">Monthly payment:</div>
                      <div className="pre_amount ml-auto">
                        <CurrencyFormat
                          value={Number(
                            Number(
                              0.02 * this.state.rent_amount +
                                this.state.rent_amount
                            ) / parseInt(this.state.payment_duration.value)
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </div>
                    </div>
                    <div className="the_options_1  flex heart">
                      <div className="pre_title">Tenor:</div>
                      <div className="pre_amount ml-auto">
                        {this.state.payment_duration.value}
                      </div>
                    </div>
                  </div>
                </div>

                {this.props.authLoading ? (
                  <Button
                    disabled
                    className={`balm w-100 heart text-center mt-2 butas bg-success`}
                  >
                    <Spinner
                      width="24"
                      className="mx-auto"
                      height="24"
                      color="white"
                      type="ThreeDots"
                    />
                  </Button>
                ) : (
                  <Button
                    className={`balm text-center mt-4 butas saa bg-success`}
                    onClick={() => {
                      let {
                        accommodation_status,
                        income,
                        rent_amount,
                        payment_duration,
                      } = this.state;

                      if (
                        accommodation_status &&
                        income &&
                        rent_amount &&
                        payment_duration
                      ) {
                        this.props.ProfileUpdate(
                          {
                            accommodation_status,
                            income,
                            rent_amount,
                            payment_duration: parseInt(payment_duration.value),
                          },
                          () => {
                            this.setState({
                              stage: "3",
                            });
                            this.props.changeThird();
                          }
                        );
                      } else {
                        Alert.warning("Please all fields.", 5000);
                      }
                    }}
                    appearance="subtle"
                    ripple={true}
                    style={{
                      width: "100%",
                      borderRadius: "6px",
                      borderWidth: 2,
                    }}
                  >
                    <span
                      style={{ fontVariant: "small-caps" }}
                      className="text-white op_button_next small"
                    >
                      Accept
                    </span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.user,
  authLoading: state.user.isLoading,
  authError: state.user.errorMsg,
});

const mapDispatchToProps = { ProfileUpdate, clearAuthErrorAction };

export default connect(mapStateToProps, mapDispatchToProps)(Option);
