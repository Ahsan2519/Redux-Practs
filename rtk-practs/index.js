const store = require("./app/store");
const cakeAction = require('./feature/cake/cakeSlice').cakeAction;
const icecreamAction = require('./feature/icecreame/icecreameSlice').icecreamAction;

console.log('initialState:',store.getState());

const unsubscribe = store.subscribe(()=>console.log('updatedState:',store.getState()));

store.dispatch(cakeAction.order());
store.dispatch(cakeAction.order());
store.dispatch(cakeAction.order());
store.dispatch(cakeAction.restocking(3));
store.dispatch(icecreamAction.order());
store.dispatch(icecreamAction.order());
store.dispatch(icecreamAction.order());
store.dispatch(icecreamAction.restocking(3));
unsubscribe()