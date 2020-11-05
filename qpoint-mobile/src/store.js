import {createStore, combineReducers} from 'redux'
import authReducer from './reducers/authReducer'
import mainFlowReducer from './reducers/mainFlowReducer'

const rootReducers = combineReducers({
    authReducer,
    mainFlowReducer
})

const confifureStore = () => createStore(rootReducers);

export default confifureStore;