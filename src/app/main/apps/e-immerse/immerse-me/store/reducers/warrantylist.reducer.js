import * as Actions from '../actions';

const initialState = {
    data      	: [],
    searchText	: '',
	count		: 0,
	statusRadio	: null,
    warrantylistMapDialog	: {
        props: {
            open: false
        },
        data : null
    },	
	masters: [],
	warrantylistStatus:[],
};

const warrantylistReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WARRANTYLIST:
        {
            return {
                ...state,
                data: action.payload,
				count: action.count
            };
        }
        case Actions.GET_WARRANTYLIST_STATUS:
        {
            return {
                ...state,
                warrantylistStatus: action.payload.filter(({disable}) => disable === false)
            };
        }		
        case Actions.GET_MASTERS:
        {
            return {
                ...state,
                masters: action.payload
            };
        }		
        case Actions.SET_WARRANTYLIST_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_WARRANTYLIST_STATUS_RADIO:
        {
            return {
                ...state, 
                statusRadio: action.statusRadio
            };
        }
        case Actions.OPEN_WARRANTYLIST_DIALOG:
        {
            return {
                ...state,
                warrantylistMapDialog: {
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_WARRANTYLIST_DIALOG:
        {
            return {
                ...state,
                warrantylistMapDialog: {
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

export default warrantylistReducer;
