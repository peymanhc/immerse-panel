import * as Actions from '../actions';

const initialState = {
    accdocAddStatusDialog: {
		open: false,
    },
    accdocAddPriceDialog: {
		open: false,
    },
    accdocShowImageDialog: {
		open: false,
    },
	accdocStatus			: [],
	order				: null,
	statusAccdocImageLoading: false,
};

const accdocReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ACCDOC:
        {
            return {
                ...state,
				accdoc:action.payload
            };
        }
        case Actions.SAVE_ACCDOC:
        {
            return {
                ...state,
				accdoc:action.payload
            };
        }
        case Actions.GET_ACCDOC_STATUS:
        {  
            return {
                ...state,
                accdocStatus: action.payload
            };
        }		
        case Actions.CLOSE_ADD_ACCDOC_STATUS_DIALOG:
        {
            return {
                ...state,
				accdocAddStatusDialog: {open:false}
            };
        }
        case Actions.OPEN_ADD_ACCDOC_STATUS_DIALOG:
        {
            return {
                ...state,
				accdocAddStatusDialog: {open:true}
            };
        }	
        case Actions.CLOSE_ADD_ACCDOC_PRICE_DIALOG:
        {
            return {
                ...state,
				accdocAddPriceDialog: {open:false}
            };
        }
        case Actions.OPEN_ADD_ACCDOC_PRICE_DIALOG:
        {
            return {
                ...state,
				accdocAddPriceDialog: {open:true}
            };
        }	

        case Actions.CLOSE_ACCDOC_SHOW_IMAGE_DIALOG:
        {
            return {
                ...state,
				accdocShowImageDialog: {open:false}
            };
        }
        case Actions.OPEN_ACCDOC_SHOW_IMAGE_DIALOG:
        {
            return {
                ...state,
				accdocShowImageDialog: {open:true}
            };
        }
		case Actions.WAIT_ACCDOC_STATUS:
		{
			return {
				...state,
				statusAccdocImageLoading: action.payload
			}
		}		
        default:
        {
            return state;
        }
    }
};

export default accdocReducer;
