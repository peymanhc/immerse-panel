import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    warrantylistStatusDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const warrantylistStatusReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_WARRANTYLISTSTATUS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_WARRANTYLISTSTATUS_DIALOG:
        {
            return {
                ...state,
                warrantylistStatusDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_WARRANTYLISTSTATUS_DIALOG:
        {
            return {
                ...state,
                warrantylistStatusDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_WARRANTYLISTSTATUS_DIALOG:
        { 
            return {
                ...state,
                warrantylistStatusDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WARRANTYLISTSTATUS_DIALOG:
        {
            return {
                ...state,
                warrantylistStatusDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_WARRANTYLISTSTATUS:
        {
            const warrantylistStatus = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [warrantylistStatus.id]: {...warrantylistStatus}
                }
            };
        }
        case Actions.SET_WARRANTYLISTSTATUS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_WARRANTYLISTSTATUS_WARRANTY_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_WARRANTYLISTSTATUS_WARRANTY:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_WARRANTYLISTSTATUS:
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

export default warrantylistStatusReducer;