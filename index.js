const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const CAKE_ORDER = "CAKE_ORDER";
const RESTOCK_CAKE = "RESTOCK_CAKE";

const orderCake = () => {
  return {
    type: CAKE_ORDER,
    payload: 1,
  };
};
const resStockCake = (qty) => {
  return {
    type: RESTOCK_CAKE,
    payload: qty,
  };
};
const initialState = {
  nunmOfCake: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDER:
      return {
        ...state,
        nunmOfCake: state.nunmOfCake - 1,
      };
    case RESTOCK_CAKE:
      return {
        ...state,
        nunmOfCake: state.nunmOfCake + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initialSate:", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated Sate:", store.getState())
);
const actions = bindActionCreators({ orderCake, resStockCake }, store.dispatch);
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.resStockCake(3);
unsubscribe();
