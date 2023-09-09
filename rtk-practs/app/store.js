const configureStore  = require('@reduxjs/toolkit').configureStore ;
const cakeReducer = require('../feature/cake/cakeSlice');
const icecreamReducer = require('../feature/icecreame/icecreameSlice');

const store = configureStore ({
    reducer: {
        cake: cakeReducer,
        icecream : icecreamReducer,
    }
});

module.exports = store