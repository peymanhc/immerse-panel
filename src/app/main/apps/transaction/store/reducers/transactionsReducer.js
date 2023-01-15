import * as Actions from '../actions/transactionsActions';
import _ from '@lodash';

const form = {
	id: null,
	displayName: '',
	email : '',
	password: '',
	role: null,
}
const initialState = {
	form,
    entities          : [],
    searchText        : '',
    selectedTransactionIds   : [],
    routeParams       : {},
    transactionDialog     : {
        type : 'new',
		open: false,
        props: {
            open: false
        },
        data : null
    },
	transaction: null,
};

const transactionsReducer = (state = initialState, action) => {
	switch(action.type){
		case Actions.GET_TRANSACTIONS:
		{
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                routeParams: action.routeParams
            };
		}
        case Actions.GET_TRANSACTION_DATA:
		{
			return {
				...state,
				transaction: action.payload,
			}
		}	
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }	
        case Actions.TOGGLE_IN_SELECTED_TRANSACTION:
        {

            const transactionId = action.transactionId;

            let selectedTransactionIds = [...state.selectedTransactionIds];

            if ( selectedTransactionIds.find(id => id === transactionId) !== undefined )
            {
                selectedTransactionIds = selectedTransactionIds.filter(id => id !== transactionId);
            }
            else
            {
                selectedTransactionIds = [...selectedTransactionIds, transactionId];
            }

            return {
                ...state,
                selectedTransactionIds: selectedTransactionIds
            };
        }
        case Actions.SELECT_ALL_TRANSACTION:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedTransactionIds = arr.map(transaction => transaction.id);

            return {
                ...state,
                selectedTransactionIds: selectedTransactionIds
            };
        }
        case Actions.DESELECT_ALL_TRANSACTION:
        {
            return {
                ...state,
                selectedTransactionIds: []
            };
        }
        case Actions.OPEN_NEW_TRANSACTION_DIALOG:
        {
            return {
                ...state,
                transactionDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_TRANSACTION_DIALOG:
        {
            return {
                ...state,
                transactionDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_TRANSACTION_DIALOG:
        {
            return {
                ...state,
                transactionDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_TRANSACTION_DIALOG:
        {
            return {
                ...state,
                transactionDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.OPEN_TRANSACTION_DIALOG:
        {
            return {
                ...state,
                transactionDialog: {
					open: true
                }
            };
        }		
        case Actions.CLOSE_TRANSACTION_DIALOG:
        {
            return {
                ...state,
                transactionDialog: {
					open: false
                },
				form
            };
        }
		case Actions.SELECT_TRANSACTION:
		{
			return {
				...state,
				form: action.payload,
			}
		}
		default:
		{
			return state;
		}
	}
}

export default transactionsReducer;