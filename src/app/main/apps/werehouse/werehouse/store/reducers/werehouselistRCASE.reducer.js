import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    werehouselistCASEDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const werehouselistCASEReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_WEREHOUSELISTCASE:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_WEREHOUSELISTCASE_DIALOG:
        {
            return {
                ...state,
                werehouselistCASEDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_WEREHOUSELISTCASE_DIALOG:
        {
            return {
                ...state,
                werehouselistCASEDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_WEREHOUSELISTCASE_DIALOG:
        { 
            return {
                ...state,
                werehouselistCASEDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WEREHOUSELISTCASE_DIALOG:
        {
            return {
                ...state,
                werehouselistCASEDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_WEREHOUSELISTCASE:
        {
            const werehouselistCASE = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [werehouselistCASE.id]: {...werehouselistCASE}
                }
            };
        }
        case Actions.SET_WEREHOUSELISTCASE_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_WEREHOUSELISTCASE_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_WEREHOUSELISTCASE_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_WEREHOUSELISTCASE:
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

export default werehouselistCASEReducer;
