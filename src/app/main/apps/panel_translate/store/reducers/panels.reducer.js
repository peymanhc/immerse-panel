import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities      	: [],
    searchText    	: '',
    orderBy			: 'order',
    orderDescending	: false,
    panelsDialog    : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading			: false,
	labels			: [],
	routeParams		: {},
};

const panelsReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_PANELS:
        { 
            return {
                ...state,
                entities   : _.keyBy(Object.keys(action.payload).map((item, i) => ({id:i+1, [item]:action.payload[item], text: action.payload[item],title: item})), 'id'),
                searchText : '',
				routeParams: action.routeParams,
            };
        }
        case Actions.GET_LABELS:
        {
            return {
                ...state,
                labels   : action.payload,
            };
        }		
        case Actions.OPEN_NEW_PANELS_DIALOG:
        {
            return {
                ...state,
                panelsDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_PANELS_DIALOG:
        {
            return {
                ...state,
                panelsDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_PANELS_DIALOG:
        { 
            return {
                ...state,
                panelsDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PANELS_DIALOG:
        {
            return {
                ...state,
                panelsDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_PANELS:
        {
            const panels = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [panels.id]: {...panels}
                }
            };
        }
        case Actions.SET_PANELS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_PANELS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_PANELS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_PANELS:
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

export default panelsReducer;