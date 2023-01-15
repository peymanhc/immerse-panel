import * as Actions from '../actions';

const initialState = {
    warrantyAddStatusDialog: {
		open: false,
    },
    warrantyAddPriceDialog: {
		open: false,
    },
    warrantyShowImageDialog: {
		open: false,
    },
	warrantyStatus			: [],
	warranty				: null,
        statusWarrantyImageLoading: false,
};

const warrantyReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WARRANTY:
        {
            return {
                ...state,
				warranty:action.payload
            };
        }
        case Actions.SAVE_WARRANTY:
        {
            return {
                ...state,
				warranty:action.payload
            };
        }
        case Actions.GET_WARRANTY_STATUS:
        {  
            return {
                ...state,
                warrantyStatus: action.payload
            };
        }		
        case Actions.CLOSE_ADD_WARRANTY_STATUS_DIALOG:
        {
            return {
                ...state,
				warrantyAddStatusDialog: {open:false}
            };
        }
        case Actions.OPEN_ADD_WARRANTY_STATUS_DIALOG:
        {
            return {
                ...state,
				warrantyAddStatusDialog: {open:true}
            };
        }	
        case Actions.CLOSE_ADD_WARRANTY_PRICE_DIALOG:
        {
            return {
                ...state,
				warrantyAddPriceDialog: {open:false}
            };
        }
        case Actions.OPEN_ADD_WARRANTY_PRICE_DIALOG:
        {
            return {
                ...state,
				warrantyAddPriceDialog: {open:true}
            };
        }	

        case Actions.CLOSE_WARRANTY_SHOW_IMAGE_DIALOG:
        {
            return {
                ...state,
				warrantyShowImageDialog: {open:false}
            };
        }
        case Actions.OPEN_WARRANTY_SHOW_IMAGE_DIALOG:
        {
            return {
                ...state,
				warrantyShowImageDialog: {open:true}
            };
        }       
        case Actions.WAIT_WARRANTY_STATUS:
        {
            return {
                ...state,
                statusWarrantyImageLoading: action.payload
            }
        }   
		
        default:
        {
            return state;
        }
    }
};

export default warrantyReducer;
