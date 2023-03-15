import { MADE_PAYMENT, GET_ALL_TRANSACTIONS, AUTH_ERROR, AUTH_LOADING, CLEAR_AUTH_ERROR } from "./../types"
import PaystackPop from "@paystack/inline-js"
import dotenv from "dotenv"
import { getAllTransactions } from "../apis/service"
dotenv.config()

export const MakePayment =
  (paymentData, callback) => async (dispatch, state) => {
    console.log({ paymentData });
    try {
      await dispatch({ type: AUTH_LOADING });
      let Profile = await state().user;
      let email = Profile.user.email;
      let name = Profile.user.full_name;
      console.log({ named: name })
      // let phone = Profile.user.phone;

      let paystack = new PaystackPop()
      await paystack.newTransaction({
        key: process.env.REACT_APP_PAYSTACK_TEST_KEY,
        amount: paymentData.first_payment * 100,
        email,
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1] ? name.split(" ")[1] : name.split(" ")[0],

        async onSuccess() {
          await callback();
        },

        async onCancel() {
          dispatch({
            type: AUTH_ERROR,
            payload: "AN ERROR OCCURED",
          });
        }

      })
    } catch (error) {
      let err
      console.log({ err: error });
      if (error.response) {
        err = error.response.data.msg;
        // console.log({ error });
      } else {
        err = "Something went wrong. Try Again";
      }
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };


export const GetAllTransactions = (email) => async (dispatch, state) => {
  // await dispatch({ type: AUTH_LOADING });
  try {
    let transactions = await getAllTransactions(email);
    console.log({ transactions: transactions.data.data });

    transactions = await transactions.data.data;

    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: transactions,
    });
    // await dispatch({ type: CLEAR_AUTH_ERROR });
  } catch (error) {
    let err
    console.log({ err: error.response });
    console.log({ error });
    if (error.response) {
      err = error.response.data.error;
    } else {
      err = "Something went wrong. Try Again";
    }
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: [],
    });
  }
  // await dispatch({ type: CLEAR_AUTH_ERROR });
};
