import {combineReducers} from 'redux';
import transaction from './transactionReducer';
import transactions from './transactionsReducer';

const reducer = combineReducers({transaction, transactions});

export default reducer;