import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    warrantycodesDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
    warrantycodesUploadDialog: {
		open: false,
    },
	warrantycodesUploadLoading: false,	
};

const warrantycodesReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.CLOSE_WARRANTYCODES_EXCEL_DIALOG:
        {
            return {
                ...state,
				warrantycodesUploadDialog: {open:false}
            };
        }
        case Actions.OPEN_WARRANTYCODES_EXCEL_DIALOG:
        {
            return {
                ...state,
				warrantycodesUploadDialog: {open:true}
            };
        }	
		case Actions.WAIT_WARRANTYCODES:
		{
			return {
				...state,
				warrantycodesUploadLoading: action.payload
			}
		}	
        case Actions.GET_WARRANTYCODES:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_WARRANTYCODES_DIALOG:
        {
            return {
                ...state,
                warrantycodesDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_WARRANTYCODES_DIALOG:
        {
            return {
                ...state,
                warrantycodesDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_WARRANTYCODES_DIALOG:
        { 
            return {
                ...state,
                warrantycodesDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WARRANTYCODES_DIALOG:
        {
            return {
                ...state,
                warrantycodesDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_WARRANTYCODES:
        {
            const warrantycodes = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [warrantycodes.id]: {...warrantycodes}
                }
            };
        }
        case Actions.SET_WARRANTYCODES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_WARRANTYCODES_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_WARRANTYCODES_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_WARRANTYCODES:
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

export default warrantycodesReducer;
