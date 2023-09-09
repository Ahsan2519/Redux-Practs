const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numberOfIcecream : 15,
}

const icecreamSlice  = createSlice({
    name: "icecream",
    initialState,
    reducers : {
        order : ((state=> {state.numberOfIcecream--})),
        restocking : (((state,action) => {state.numberOfIcecream+=action.payload}))
    }

});

module.exports = icecreamSlice.reducer
module.exports.icecreamAction = icecreamSlice.actions