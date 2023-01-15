import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    slidersDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const slidersReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_SLIDERS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_SLIDERS_DIALOG:
        {
            return {
                ...state,
                slidersDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_SLIDERS_DIALOG:
        {
            return {
                ...state,
                slidersDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_SLIDERS_DIALOG:
        { 
            return {
                ...state,
                slidersDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_SLIDERS_DIALOG:
        {
            return {
                ...state,
                slidersDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_SLIDERS:
        {
            const sliders = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [sliders.id]: {...sliders}
                }
            };
        }
        case Actions.SET_SLIDERS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_SLIDERS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_SLIDERS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_SLIDERS:
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

export default slidersReducer;