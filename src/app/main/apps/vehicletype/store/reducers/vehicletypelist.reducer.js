import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    vehicletypelistDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const vehicletypelistReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_VEHICLETYPELIST:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_VEHICLETYPELIST_DIALOG:
        {
            return {
                ...state,
                vehicletypelistDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_VEHICLETYPELIST_DIALOG:
        {
            return {
                ...state,
                vehicletypelistDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_VEHICLETYPELIST_DIALOG:
        { 
            return {
                ...state,
                vehicletypelistDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_VEHICLETYPELIST_DIALOG:
        {
            return {
                ...state,
                vehicletypelistDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_VEHICLETYPELIST:
        {
            const vehicletypelist = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [vehicletypelist.id]: {...vehicletypelist}
                }
            };
        }
        case Actions.SET_VEHICLETYPELIST_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_VEHICLETYPELIST_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_VEHICLETYPELIST_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_VEHICLETYPELIST:
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

export default vehicletypelistReducer;
