import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : '',
    orderDescending: false,
    propertyDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false	
};

const propertyLabelsReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_PROPERTYLABELS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_PROPERTYLABELS_DIALOG:
        {
            return {
                ...state,
                propertyDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_PROPERTYLABELS_DIALOG:
        {
            return {
                ...state,
                propertyDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_PROPERTYLABELS_DIALOG:
        { 
            return {
                ...state,
                propertyDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PROPERTYLABELS_DIALOG:
        {
            return {
                ...state,
                propertyDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_PROPERTYLABELS:
        {
            const property = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [property.id]: {...property}
                }
            };
        }
        case Actions.SET_PROPERTYLABELS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_PROPERTYLABELS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_PROPERTYLABELS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_PROPERTYLABELS:
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

export default propertyLabelsReducer;