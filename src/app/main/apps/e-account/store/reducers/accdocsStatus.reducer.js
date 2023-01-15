import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    accdocsStatusDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const accdocsStatusReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_ACCDOCSSTATUS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_ACCDOCSSTATUS_DIALOG:
        {
            return {
                ...state,
                accdocsStatusDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_ACCDOCSSTATUS_DIALOG:
        {
            return {
                ...state,
                accdocsStatusDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_ACCDOCSSTATUS_DIALOG:
        { 
            return {
                ...state,
                accdocsStatusDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_ACCDOCSSTATUS_DIALOG:
        {
            return {
                ...state,
                accdocsStatusDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_ACCDOCSSTATUS:
        {
            const accdocsStatus = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [accdocsStatus.id]: {...accdocsStatus}
                }
            };
        }
        case Actions.SET_ACCDOCSSTATUS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_ACCDOCSSTATUS_ACCDOC_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_ACCDOCSSTATUS_ACCDOC:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_ACCDOCSSTATUS:
		{
			return {
				...state,
				loading: action.payload
			}
		}
        default:
            return state;
    }
};

export default accdocsStatusReducer;