import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    dictionarysDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    loading: false,
};

const dictionarysReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_DICTIONARYS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_DICTIONARYS_DIALOG:
        {
            return {
                ...state,
                dictionarysDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        
        case Actions.CLOSE_NEW_DICTIONARYS_DIALOG:
        {
            return {
                ...state,
                dictionarysDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_DICTIONARYS_DIALOG:
        { 
            return {
                ...state,
                dictionarysDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_DICTIONARYS_DIALOG:
        {
            return {
                ...state,
                dictionarysDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }       
        case Actions.UPDATE_DICTIONARYS:
        {
            const dictionarys = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [dictionarys.id]: {...dictionarys}
                }
            };
        }
        case Actions.SET_DICTIONARYS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_DICTIONARYS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_DICTIONARYS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
        case Actions.WAIT_DICTIONARYS:
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

export default dictionarysReducer;