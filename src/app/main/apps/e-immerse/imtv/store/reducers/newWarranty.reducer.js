import * as Actions from '../actions';

//const discounts = [
//	{id:'1', title:'15 darsad takhfif', value:15},
//	{id:'2', title:'25 darsad takhfif', value:25},
//	{id:'3', title:'35 darsad takhfif', value:35},
//	{id:'4', title:'45 darsad takhfif', value:45},
//];

const initialState = {
    warrantyAddUserDialog	: {
		open	: false,
		loading	: false,		
    },
    warrantyAddProductDialog	: {
		open	: false,
		loading	: false,
		data	: null,
    },	
    warrantyAddDiscountDialog	: {
		open	: false,
		loading	: false,
		data	: null,
    },	
    warrantyAddTaxDialog	: {
		open	: false,
		loading	: false,
		data	: null,
    },		
	users				: [],
	addresses			: [],	
	status				: [],	
	companies			: [],	
	products			: [],	
	discounts			: [],
	addedDiscounts		: [],
	addedTax			: [],
	tax					: [],
};

const newWarrantyReducer = function (state = initialState, action) {
    switch ( action.type )
    {	
        case Actions.CLOSE_ADD_WARRANTY_USER_DIALOG:
        {
            return {
                ...state,
				warrantyAddUserDialog: {...state.warrantyAddUserDialog, open:false}
            };
        }
        case Actions.OPEN_ADD_WARRANTY_USER_DIALOG:
        {
            return {
                ...state,
				warrantyAddUserDialog: {...state.warrantyAddUserDialog, open:true}
            };
        }	
        case Actions.CLOSE_ADD_WARRANTY_PRODUCT_DIALOG:
        {
            return {
                ...state,
				warrantyAddProductDialog: {...state.warrantyAddProductDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_WARRANTY_PRODUCT_DIALOG:
        {
            return {
                ...state,
				warrantyAddProductDialog: {...state.warrantyAddProductDialog, open:true, data:action.data}
            };
        }
        case Actions.CLOSE_ADD_WARRANTY_DISCOUNT_DIALOG:
        {
            return {
                ...state,
				warrantyAddDiscountDialog: {...state.warrantyAddDiscountDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_WARRANTY_DISCOUNT_DIALOG:
        {
            return {
                ...state,
				warrantyAddDiscountDialog: {...state.warrantyAddDiscountDialog, open:true, data:action.data}
            };
        }			
        case Actions.CLOSE_ADD_WARRANTY_TAX_DIALOG:
        {
            return {
                ...state,
				warrantyAddTaxDialog: {...state.warrantyAddTaxDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_WARRANTY_TAX_DIALOG:
        {
            return {
                ...state,
				warrantyAddTaxDialog: {...state.warrantyAddTaxDialog, open:true, data:action.data}
            };
        }			
        case Actions.NEW_WARRANTY_ADD_DISCOUNT:
        {
			
            return {
                ...state,
				addedDiscounts: addToList(state.addedDiscounts, action.payload),
            };
        }	
        case Actions.NEW_WARRANTY_DELETE_DISCOUNT:
        {
			
            return {
                ...state,
				addedDiscounts: state.addedDiscounts.filter(({id}) => id !== action.payload),
            };
        }			
        case Actions.NEW_WARRANTY_ADD_TAX:
        {
			
            return {
                ...state,
				addedTax: addToList(state.addedTax, action.payload),
            };
        }	
        case Actions.NEW_WARRANTY_DELETE_TAX:
        {
			
            return {
                ...state,
				addedTax: state.addedTax.filter(({id}) => id !== action.payload),
            };
        }					
        case Actions.NEW_WARRANTY_GET_USERS:
        {
            return {
                ...state,
				users: action.payload,
            };
        }		
        case Actions.NEW_WARRANTY_GET_ADDRESSES:
        {
            return {
                ...state,
				addresses: action.payload,
            };
        }
        case Actions.NEW_WARRANTY_GET_STATUS:
        {
            return {
                ...state,
				status: action.payload,
            };
        }
        case Actions.NEW_WARRANTY_GET_COMPANIS:
        {
            return {
                ...state,
				companies: action.payload,
            };
        }
        case Actions.NEW_WARRANTY_GET_PRODUCTS:
        {
            return {
                ...state,
				products: action.payload,
            };
        }	
        case Actions.NEW_WARRANTY_GET_DISCOUNTS:
        {
            return {
                ...state,
				discounts: action.payload,
            };
        }
        case Actions.NEW_WARRANTY_GET_TAX:
        {
            return {
                ...state,
				tax: action.payload,
            };
        }					
		case Actions.WAIT_NEW_WARRANTY_ADD_USER:
		{
			return {
				...state,
				warrantyAddUserDialog:{...state.warrantyAddUserDialog, loading:action.payload}
			}
		}		
        default:
        {
            return state;
        }
    }
};

const addToList = (list, object) => {
	
	const findIndex = list.findIndex(({id}) => id === object.id);
	if(findIndex !== -1){
		const newList = [
			...list.slice(0, findIndex),
			object,
			...list.slice(findIndex + 1)
		];
		return newList;
	}
	else
		return [...list, object];
	
};

export default newWarrantyReducer;
