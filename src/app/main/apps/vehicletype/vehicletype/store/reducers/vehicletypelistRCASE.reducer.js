import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    vehicletypelistCASEDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const vehicletypelistCASEReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_VEHICLETYPELISTCASE:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_VEHICLETYPELISTCASE_DIALOG:
        {
            return {
                ...state,
                vehicletypelistCASEDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_VEHICLETYPELISTCASE_DIALOG:
        {
            return {
                ...state,
                vehicletypelistCASEDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_VEHICLETYPELISTCASE_DIALOG:
        { 
            return {
                ...state,
                vehicletypelistCASEDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_VEHICLETYPELISTCASE_DIALOG:
        {
            return {
                ...state,
                vehicletypelistCASEDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_VEHICLETYPELISTCASE:
        {
            const vehicletypelistCASE = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [vehicletypelistCASE.id]: {...vehicletypelistCASE}
                }
            };
        }
        case Actions.SET_VEHICLETYPELISTCASE_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_VEHICLETYPELISTCASE_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_VEHICLETYPELISTCASE_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_VEHICLETYPELISTCASE:
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

export default vehicletypelistCASEReducer;
