import React from "react";
import { Table, Button } from "rsuite";
import { mockUsers } from "./../store/mock";

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

console.log({ data });

export const Transaction = () => {
    return (
        <Table
            height={400}
            data={data}
            onRowClick={(rowData) => {
                console.log(rowData);
            }}
        >
            <Column width={60} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
            </Column>

            <Column width={150}>
                <HeaderCell>First Name</HeaderCell>
                <Cell dataKey="firstName" />
            </Column>

            <Column width={150}>
                <HeaderCell>Last Name</HeaderCell>
                <Cell dataKey="lastName" />
            </Column>

            <Column width={100}>
                <HeaderCell>Gender</HeaderCell>
                <Cell dataKey="gender" />
            </Column>

            <Column width={100}>
                <HeaderCell>Age</HeaderCell>
                <Cell dataKey="age" />
            </Column>

            <Column width={150}>
                <HeaderCell>Postcode</HeaderCell>
                <Cell dataKey="postcode" />
            </Column>

            <Column width={300}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
            </Column>
        </Table>
    );
};
