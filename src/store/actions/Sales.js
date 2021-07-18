import { getAllTransaction } from "./../apis/service";
import { GET_ALL_TRANSACTIONS } from "./../types";

export const getAllTransactionAction = () => async dispatch => {
  try {
    let transactions = await getAllTransaction();
    transactions = await transactions.data.data;
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: transactions
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: []
    });
    console.log({ error });
  }
};
