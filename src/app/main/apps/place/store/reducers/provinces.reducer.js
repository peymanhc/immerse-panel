import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities				: [],
	provinces             		: [],
    searchText       		: '',
    selectedProvinceIds  	 	: [],
    provinceDialog    			: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,	
};

const provincesReducer = (state = initialState, action) => {
	switch(action.type){
		case Actions.GET_PROVINCES:
		{
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
				provinces: action.payload,
            };
		}	
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }	
        case Actions.TOGGLE_IN_SELECTED_PROVINCES:
        {

            const provinceId = action.provinceId;

            let selectedProvinceIds = [...state.selectedProvinceIds];

            if ( selectedProvinceIds.find(id => id === provinceId) !== undefined )
            {
                selectedProvinceIds = selectedProvinceIds.filter(id => id !== provinceId);
            }
            else
            {
                selectedProvinceIds = [...selectedProvinceIds, provinceId];
            }

            return {
                ...state,
                selectedProvinceIds: selectedProvinceIds
            };
        }
        case Actions.SELECT_ALL_PROVINCES:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedProvinceIds = arr.map(province => province.id);

            return {
                ...state,
                selectedProvinceIds: selectedProvinceIds
            };
        }
        case Actions.DESELECT_ALL_PROVINCES:
        {
            return {
                ...state,
                selectedProvinceIds: []
            };
        }
        case Actions.OPEN_NEW_PROVINCE_DIALOG:
        {
            return {
                ...state,
                provinceDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_PROVINCE_DIALOG:
        {
            return {
                ...state,
                provinceDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_PROVINCE_DIALOG:
        {
            return {
                ...state,
                provinceDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PROVINCE_DIALOG:
        {
            return {
                ...state,
                provinceDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
		case Actions.WAIT_PROVINCES:
		{
			return {
				...state,
				loading: action.payload
			}
		}		
		default:
		{
			return state;
		}
	}
}

export default provincesReducer;