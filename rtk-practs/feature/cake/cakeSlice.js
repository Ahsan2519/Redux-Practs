const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numberOfCake : 15,
}

const cakeSlice  = createSlice({
    name: "cake",
    initialState,
    reducers : {
        order : ((state=> {state.numberOfCake--})),
        restocking : (((state,action) => {state.numberOfCake+=action.payload}))
    }

});

module.exports = cakeSlice.reducer
module.exports.cakeAction = cakeSlice.actions