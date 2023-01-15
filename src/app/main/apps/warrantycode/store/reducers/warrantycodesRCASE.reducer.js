import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    warrantycodesCASEDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const warrantycodesCASEReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_WARRANTYCODESCASE:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_WARRANTYCODESCASE_DIALOG:
        {
            return {
                ...state,
                warrantycodesCASEDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_WARRANTYCODESCASE_DIALOG:
        {
            return {
                ...state,
                warrantycodesCASEDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_WARRANTYCODESCASE_DIALOG:
        { 
            return {
                ...state,
                warrantycodesCASEDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WARRANTYCODESCASE_DIALOG:
        {
            return {
                ...state,
                warrantycodesCASEDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_WARRANTYCODESCASE:
        {
            const warrantycodesCASE = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [warrantycodesCASE.id]: {...warrantycodesCASE}
                }
            };
        }
        case Actions.SET_WARRANTYCODESCASE_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_WARRANTYCODESCASE_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_WARRANTYCODESCASE_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_WARRANTYCODESCASE:
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

export default warrantycodesCASEReducer;
