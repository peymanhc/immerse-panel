import * as Actions from '../actions';

const initialState = {
    data      	: [],
    searchText	: '',
	count		: 0,
	statusRadio	: null,
    accdocsMapDialog	: {
        props: {
            open: false
        },
        data : null
    },	
	masters: [],
	accdocsStatus:[],
};

const accdocsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ACCDOCS:
        {
            return {
                ...state,
                data: action.payload,
				count: action.count
            };
        }
        case Actions.GET_ACCDOCS_STATUS:
        {
            return {
                ...state,
                accdocsStatus: action.payload.filter(({disable}) => disable === false)
            };
        }		
        case Actions.GET_MASTERS:
        {
            return {
                ...state,
                masters: action.payload
            };
        }		
        case Actions.SET_ACCDOCS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_ACCDOCS_STATUS_RADIO:
        {
            return {
                ...state, 
                statusRadio: action.statusRadio
            };
        }
        case Actions.OPEN_ACCDOCS_DIALOG:
        {
            return {
                ...state,
                accdocsMapDialog: {
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_ACCDOCS_DIALOG:
        {
            return {
                ...state,
                accdocsMapDialog: {
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        default:
        {
            return state;
        }
    }
};

export default accdocsReducer;
