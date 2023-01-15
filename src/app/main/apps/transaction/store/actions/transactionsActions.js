import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_TRANSACTION = '[TRANSACTION APP] GET TRANSACTION';
export const OPEN_TRANSACTION_DIALOG = '[TRANSACTION APP] OPEN TRANSACTION DIALOG';
export const CLOSE_TRANSACTION_DIALOG = '[TRANSACTION APP] CLOSE TRANSACTION DIALOG';
export const SELECT_TRANSACTION = '[TRANSACTION APP] SELECT TRANSACTION';

export const SET_SEARCH_TEXT = '[TRANSACTION APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_TRANSACTION = '[TRANSACTION APP] TOGGLE IN SELECTED TRANSACTION';
export const SELECT_ALL_TRANSACTION = '[TRANSACTION APP] SELECT ALL TRANSACTION';
export const DESELECT_ALL_TRANSACTION = '[TRANSACTION APP] DESELECT ALL TRANSACTION';
export const OPEN_NEW_TRANSACTION_DIALOG = '[TRANSACTION APP] OPEN NEW TRANSACTION DIALOG';
export const CLOSE_NEW_TRANSACTION_DIALOG = '[TRANSACTION APP] CLOSE NEW TRANSACTION DIALOG';
export const OPEN_EDIT_TRANSACTION_DIALOG = '[TRANSACTION APP] OPEN EDIT TRANSACTION DIALOG';
export const CLOSE_EDIT_TRANSACTION_DIALOG = '[TRANSACTION APP] CLOSE EDIT TRANSACTION DIALOG';
export const ADD_TRANSACTION = '[TRANSACTION APP] ADD TRANSACTION';
export const UPDATE_TRANSACTION = '[TRANSACTION APP] UPDATE TRANSACTION';
export const REMOVE_TRANSACTION = '[TRANSACTION APP] REMOVE TRANSACTION';
export const REMOVE_TRANSACTIONS = '[TRANSACTION APP] REMOVE TRANSACTIONS';
export const TOGGLE_STARRED_TRANSACTION = '[TRANSACTION APP] TOGGLE STARRED TRANSACTION';
export const TOGGLE_STARRED_TRANSACTIONS = '[TRANSACTION APP] TOGGLE STARRED TRANSACTION';
export const SET_TRANSACTION_STARRED = '[TRANSACTION APP] SET TRANSACTION STARRED ';
export const GET_TRANSACTION_DATA = '[TRANSACTION APP] GET TRANSACTION DATA';

export const GET_TRANSACTIONS = '[TRANSACTION APP] GET TRANSACTIONS';

export function getTransactionData()
{ 
    const request = axios.get('/api/transaction-app/transaction');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TRANSACTION_DATA,
                payload: response.data
            })
        );
}
 
export function getTransactions() {
    const request = axios.get('/api/transaction-app/getTransactions');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TRANSACTIONS,
                payload: response.data,              
            })
        );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedTransactions(transactionId)
{
    return {
        type: TOGGLE_IN_SELECTED_TRANSACTION,
        transactionId
    }
}

export function selectAllTransactions()
{
    return {
        type: SELECT_ALL_TRANSACTION
    }
}

export function deSelectAllTransactions()
{
    return {
        type: DESELECT_ALL_TRANSACTION
    }
}

export function openNewTransactionDialog()
{
    return {
        type: OPEN_NEW_TRANSACTION_DIALOG
    }
}

export function closeNewTransactionDialog()
{
    return {
        type: CLOSE_NEW_TRANSACTION_DIALOG
    }
}

export function openEditTransactionDialog(data)
{
    return {
        type: OPEN_EDIT_TRANSACTION_DIALOG,
        data
    }
}

export function closeEditTransactionDialog()
{
    return {
        type: CLOSE_EDIT_TRANSACTION_DIALOG
    }
}

export function addTransaction(newTransaction)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().TransactionsApp.transactions;

        const request = axios.post('/api/transaction-app/create-transaction', {
            transaction:newTransaction
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_TRANSACTION
                })
            ]).then(() => dispatch(getTransactions(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function updateTransaction(transaction)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().TransactionsApp.transactions;

        const request = axios.put('/api/transaction-app/save-transaction', {
            transaction
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_TRANSACTION
                })
            ]).then(() => dispatch(getTransactions(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function removeTransaction(transactionId)
{
    return (dispatch) => {


        const request = axios.post('/api/transaction-app/remove-transactions', { transactionIds:[transactionId] });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_TRANSACTION
                })
            ]).then(() => dispatch(getTransactions()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function removeTransactions(transactionIds)
{
    return (dispatch) => {

        const request = axios.post('/api/transaction-app/remove-transactions', {transactionIds});

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_TRANSACTIONS
                }),
                dispatch({
                    type: DESELECT_ALL_TRANSACTION
                })
            ]).then(() => dispatch(getTransactions()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function toggleStarredTransaction(transactionId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().TransactionsApp.transactions;

        const request = axios.put('/api/transaction-app/toggle-starred-transactions', {
            transactionIds:[transactionId]
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_TRANSACTION
                }),
                dispatch(getTransactionData())
            ]).then(() => dispatch(getTransactions(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function toggleStarredTransactions(transactionIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().TransactionsApp.transactions;

        const request = axios.put('/api/transaction-app/toggle-starred-transactions', {
            transactionIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_TRANSACTIONS
                }),
                dispatch({
                    type: DESELECT_ALL_TRANSACTION
                }),
                dispatch(getTransactionData())
            ]).then(() => dispatch(getTransactions(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setTransactionsStarred(transactionIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().TransactionsApp.transactions;

        const request = axios.put('/api/transaction-app/set-transactions-starred', {
            transactionIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_TRANSACTION_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_TRANSACTION
                }),
                dispatch(getTransactionData())
            ]).then(() => dispatch(getTransactions(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setTransactionsUnstarred(transactionIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().TransactionsApp.transactions;

        const request = axios.put('/api/transaction-app/set-transactions-unstarred', {
            transactionIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_TRANSACTION_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_TRANSACTION
                }),
                dispatch(getTransactionData())
            ]).then(() => dispatch(getTransactions(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function openTransactionDialog()
{
    return {
        type: OPEN_TRANSACTION_DIALOG
    }
}

export function closeTransactionDialog()
{
    return {
        type: CLOSE_TRANSACTION_DIALOG
    }
}

export function selectTransaction(value)
{
    return {
        type: SELECT_TRANSACTION,
		payload: value
    }	
}