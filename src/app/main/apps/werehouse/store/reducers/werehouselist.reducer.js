import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    werehouselistDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const werehouselistReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_WEREHOUSELIST:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_WEREHOUSELIST_DIALOG:
        {
            return {
                ...state,
                werehouselistDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_WEREHOUSELIST_DIALOG:
        {
            return {
                ...state,
                werehouselistDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_WEREHOUSELIST_DIALOG:
        { 
            return {
                ...state,
                werehouselistDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WEREHOUSELIST_DIALOG:
        {
            return {
                ...state,
                werehouselistDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_WEREHOUSELIST:
        {
            const werehouselist = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [werehouselist.id]: {...werehouselist}
                }
            };
        }
        case Actions.SET_WEREHOUSELIST_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_WEREHOUSELIST_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_WEREHOUSELIST_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_WEREHOUSELIST:
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

export default werehouselistReducer;
