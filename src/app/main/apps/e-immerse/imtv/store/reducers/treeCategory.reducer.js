import * as Actions from '../actions/treeCategory.actions';
//import _ from '@lodash';

const initialState = {
	loading			: false,
	categoryDialog	: {
        type : 'new',
        props: {
            open: false
        },
        data 		: null,
		treeInfo	: {},		
	},
	categories		: [],
	categoryLabels	: [],
	types			: [],
	indexLoading	: false,
};

const treeCategoryReducer = function (state = initialState, action) {
    switch ( action.type )
    {		
        case Actions.GET_TYPES:
        {
            return {
                ...state,
                types   : action.payload,
            };
        }		
        case Actions.GET_CATEGORY_LABELS:
        {
            return {
                ...state,
                categoryLabels: action.payload,
            };
        }        
        case Actions.GET_ENTIRE_CATEGORIES:
        { 
            return {
                ...state,
                categories: action.payload,
            };
        }        		
        case Actions.OPEN_NEW_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
					type	: 'new',
					props	: {
						open: true
					},
					data		: null,
					treeInfo	: action.payload,
                }
            };
        }	 
        case Actions.CLOSE_NEW_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
					type	: 'new',
					props	: {
						open: false,
					},
					data		: null,
					treeInfo	: {},
                }
            }; 
        } 	
        case Actions.OPEN_EDIT_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
					type	: 'edit',
					props	: {
						open: true,
					},
					data		: action.payload,
					treeInfo	: action.payload2,
                }
            };
        }			
        case Actions.CLOSE_EDIT_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
					type	: 'edit',
					props	: {
						open: false,
					},
					data		: null,
					treeInfo	: {},
                }
            };
        }        			
		case Actions.WAIT_CATEGORY:
		{
			return {
				...state,
				loading:action.payload
			}
		}
		case Actions.WAIT_CATEGORY_INDEX:
		{
			return {
				...state,
				indexLoading:action.payload
			}
		}
        default:
        {
            return state;
        }
    }
};

export default treeCategoryReducer;
