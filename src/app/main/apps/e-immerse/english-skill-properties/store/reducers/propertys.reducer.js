import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : '',
    orderDescending: false,
    routeParams    : {},
    propertyDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	labelDialog:{
		open: false
	},
	loading: false		
};

const propertysReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PROPERTYS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
                routeParams: action.routeParams
            };
        }
        case Actions.UPDATE_PROPERTYS:
        {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.OPEN_NEW_PROPERTY_DIALOG:
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
        case Actions.OPEN_NEW_LABEL_DIALOG:
        {
            return {
                ...state,
                labelDialog: {
					open: true
                }
            };
        }
        case Actions.CLOSE_NEW_LABEL_DIALOG:
        {
            return {
                ...state,
                labelDialog: {
					open: false
                }
            };
        }		
        case Actions.CLOSE_NEW_PROPERTY_DIALOG:
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
        case Actions.OPEN_EDIT_PROPERTY_DIALOG:
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
        case Actions.CLOSE_EDIT_PROPERTY_DIALOG:
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
        case Actions.UPDATE_PROPERTY:
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
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_PROPERTY:
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

export default propertysReducer;
