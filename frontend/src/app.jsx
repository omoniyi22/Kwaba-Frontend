import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./components/Auth";
import Rent from "./components/Rent";
import { Button } from "rsuite";
import { LogoutAction } from "./store/actions/Auth";
import { Transaction } from "./components/Transaction";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_transactions: false,
        };
    }

    render() {
        let { isAuthenticated } = this.props;
        return (
            <Router>
                <div className="first-container">
                    <div className=" z-depth-1 px-2">
                        <div>
                            {isAuthenticated && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Button
                                        size={"sm"}
                                        className={
                                            "border z-depth-0 my-2 white border"
                                        }
                                        onClick={() => {
                                            this.setState({
                                                show_transactions: false,
                                            });
                                            this.props.LogoutAction();
                                        }}
                                    >
                                        <small className="small ">
                                            SIGNOUT
                                        </small>
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        className={
                                            "border ml-2 z-depth-0 my-2 white border"
                                        }
                                        onClick={() => {
                                            this.setState({
                                                show_transactions: false,
                                            });
                                        }}
                                    >
                                        <small className="small ">
                                            RENT
                                        </small>
                                    </Button>

                                    <Button
                                        size={"sm"}
                                        className={
                                            "ml-auto border z-depth-0 my-2 white border"
                                        }
                                        onClick={() => {
                                            this.setState({
                                                show_transactions: true,
                                            });
                                        }}
                                    >
                                        <small className="small">
                                            TRANSACTIONS
                                        </small>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="app mx-auto border-left border-right z-depth-1 m-auto w-fit p-4 my-auto">
                            {isAuthenticated ? (
                                <>
                                    {!this.state.show_transactions ? (
                                        <>
                                            <div className="app_title locop">
                                                My Rent
                                            </div>
                                            <Rent />
                                        </>
                                    ) : (
                                        <>
                                            <div className="app_title locop">
                                                My Transactions
                                            </div>
                                            <Transaction />
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="app_title welcome_class text-center">
                                        Welcome
                                    </div>
                                    <Auth />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});
export default connect(mapStateToProps, { LogoutAction })(App);
