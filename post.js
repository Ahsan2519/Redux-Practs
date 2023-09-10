const redux = require("redux");
const createStore = redux.createStore;
const axios = require("axios");
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const reduxThunk = require("redux-thunk").default;
const produce = require("immer").produce;

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
      let result = [];
      data.forEach((element) => {
        result.push({
          title: element.title,
        });
      });
      dispatch(userFetchFulfill(result));
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
      // with immer
      return produce(state, (draft) => {
        draft.isPending = true;
      });
    //   without immer
    //   return { ...state, isPending: true };
    case USERS_FULFIL:
      return produce(state, (draft) => {
        draft.isPending = false;
        draft.data = action.payload.value;
      });
    // return {
    //   ...state,
    //   isPending: false,
    //   data: action.payload.value
    // };
    case USERS_REJECTED:
      return produce(state, (draft) => {
        draft.isPending = false;
        draft.error = action.payload.error;
      });
    //   return { ...state, isPending: false, error: action.payload.error };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

store.dispatch(fetchUsers());