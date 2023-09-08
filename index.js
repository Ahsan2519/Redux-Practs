const redux = require('redux');
const createStore = redux.createStore;
const CAKE_ORDER = 'CAKE_ORDER';

const orderCake  = ()=>{
   return {
        type: CAKE_ORDER,
        payload : 1
    }
} 
 const initialState = {
    nunmOfCake : 10,
 }

const reducer = (state = initialState , action)=>{
    switch(action.type){
        case CAKE_ORDER :
            return (
                {
                    ...state,
                    nunmOfCake: state.nunmOfCake - 1
                }
            )
            default :
            return state
    }
}

const store  = createStore(reducer);
console.log('initialSate:',store.getState());
const unsubscribe = store.subscribe(()=>console.log('Updated Sate:', store.getState()))
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
unsubscribe();