import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : '',
    orderDescending: false,
    routeParams    : {},
    categoryDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	labelDialog:{
		open: false
	},
	loading: false,
	types:[],
};

const categorysReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_TYPES:
        {
            return {
                ...state,
                types   : action.payload,
            };
        }
        case Actions.GET_CATEGORYS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
                routeParams: action.routeParams
            };
        }
        case Actions.UPDATE_CATEGORYS:
        {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.OPEN_NEW_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
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
        case Actions.CLOSE_NEW_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.UPDATE_CATEGORY:
        {
            const category = action.payload;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [category.id]: {...category}
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
		case Actions.WAIT_CATEGORY:
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

export default categorysReducer;
