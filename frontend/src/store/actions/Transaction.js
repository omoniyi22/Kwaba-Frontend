import { MADE_PAYMENT, GET_ALL_TRANSACTIONS, AUTH_ERROR, AUTH_LOADING } from "./../types"
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
      // let phone = Profile.user.phone;

      let paystack = new PaystackPop()
      await paystack.newTransaction({
        key: "pk_test_5b8d0c3254092c27d8d53aafda069070ceed77f7",
        amount: paymentData.first_payment * 100,
        email,
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1],
        
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


export const GetAllTransactions = () => async (dispatch, state) => {
  await dispatch({ type: AUTH_LOADING });
  try {
    let transactions = await getAllTransactions();
    console.log({ transactions: transactions.data.data });

    transactions = await transactions.data.data;


    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: transactions,
    });
  } catch (error) {
    let err
    console.log({ err: error.response });
    console.log({ err: error.message });
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
};
