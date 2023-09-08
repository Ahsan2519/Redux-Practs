const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const produce = require("immer").produce;
const CAKE_ORDER = "CAKE_ORDER";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const ICECREAM_ORDER = "ICECREAM_ORDER";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";
const CUSTOMER_VISITED = "CUSTOMER_VISITED";

const orderCake = () => {
  return {
    type: CAKE_ORDER,
  };
};
const orderIcecream = () => {
  return {
    type: ICECREAM_ORDER,
  };
};
const resStockCake = (qty) => {
  return {
    type: RESTOCK_CAKE,
    payload: qty,
  };
};
const resStockIcecream = (qty) => {
  return {
    type: RESTOCK_ICECREAM,
    payload: qty,
  };
};
const customer = (pincode, city) => {
  return {
    type: CUSTOMER_VISITED,
    payload: { pincode, city },
  };
};
const initialState = {
  nunmOfCake: 10,
  numberOfIcecream: 25,
  customerAddress: {
    state: "mh",
    zipCode: 400043,
    city: "mumbai",
  },
};

const cakeReducer = (state = initialState, action) => {
  console.log(state.nunmOfCake);
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
    case CUSTOMER_VISITED:
      // without immer
      //   return {
      //     ...state,
      //     customerAddress : {
      //         ...state.customerAddress,
      //         zipCode: action.payload.pincode,
      //         city: action.payload.city,
      //     }
      // with immer
      return produce(state, (draft) => {
        draft.customerAddress.zipCode = action.payload.pincode;
        draft.customerAddress.city = action.payload.city;
      });

    default:
      return state;
  }
};
const IcecreamReducer = (state = initialState, action) => {
  console.log(state.numberOfIcecream);
  switch (action.type) {
    case ICECREAM_ORDER:
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream - 1,
      };
    case RESTOCK_ICECREAM:
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream + action.payload,
      };
    default:
      return state;
  }
};
// here creating store with createStore
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: IcecreamReducer,
});
const store = createStore(rootReducer);
console.log("initialSate:", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated Sate:", store.getState())
);
// here im binding the action creator with bindActionCreators
const actions = bindActionCreators(
  { orderCake, resStockCake, orderIcecream, resStockIcecream, customer },
  store.dispatch
);
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.resStockCake(3);
actions.customer(400008, "Navi Mumbai");
actions.orderIcecream();
actions.orderIcecream();
actions.resStockIcecream(2);
unsubscribe();
