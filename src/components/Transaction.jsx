import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from "rsuite";
import { GetAllTransactions } from "../store/actions/Transaction";
import Spinner from "react-loader-spinner";

const { Column, HeaderCell, Cell } = Table;


export class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.GetAllTransactions(this.props.userData.email);
    }

    render() {
        return (
            <>
                {" "}
                {this.props.transactions &&
                this.props.transactions.length > 0 ? (
                    <Table
                        height={400}
                        data={this.props.transactions}
                        onRowClick={(rowData) => {
                            console.log(rowData);
                        }}
                    >
                        <Column width={150}>
                            <HeaderCell> Name</HeaderCell>
                            <Cell dataKey="name" />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Amount</HeaderCell>
                            <Cell dataKey="amount" />
                        </Column>

                        <Column width={280}>
                            <HeaderCell>Email</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>
                        <Column width={100}>
                            <HeaderCell>Method</HeaderCell>
                            <Cell dataKey="method" />
                        </Column>
                        <Column width={300}>
                            <HeaderCell>Paid At</HeaderCell>
                            <Cell dataKey="paidAt" />
                        </Column>
                    </Table>
                ) : (
                    <div className="p-4">
                        <Spinner
                            width="24"
                            className="mx-auto"
                            height="24"
                            color="white"
                            type="ThreeDots"
                        />
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: state.user.user,
    transactions: state.transactions.transactions,
    authLoading: state.user.isLoading,
    authError: state.user.errorMsg,
});

const mapDispatchToProps = { GetAllTransactions };

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
