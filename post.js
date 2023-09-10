const redux = require("redux");
const createStore = redux.createStore;
const axios = require("axios");
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const reduxThunk = require("redux-thunk").default;

const USERS_PENDING = "USERS_PENDING";
const USERS_FULFIL = "USERS_FULFIL";
const USERS_REJECTED = "USERS_REJECTED";

const userFetchPending = () => {
  return { type: USERS_PENDING };
};
const userFetchFulfill = (value) => {
  return { type: USERS_FULFIL, payload: { value } };
};
const userFetchRejected = (error) => {
  return { type: USERS_REJECTED, payload: { error } };
};

const fetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(userFetchPending());
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/`
      );
      //   console.log(data);
      dispatch(userFetchFulfill(data));
    } catch (error) {
      dispatch(userFetchRejected(error.message));
    }
  };
};

const initialSate = {
  data: [],
  isPending: false,
  error: "",
};

const reducer = (state = initialSate, action) => {
  switch (action.type) {
    case USERS_PENDING:
      return { ...state, isPending: true };
    case USERS_FULFIL:
      return {
        ...state,
        isPending: false,
        data: action.payload.value,
      };
    case USERS_REJECTED:
      return { ...state, isPending: false, error: action.payload.error };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

store.dispatch(fetchUsers());
