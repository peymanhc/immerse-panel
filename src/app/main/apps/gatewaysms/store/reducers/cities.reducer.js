import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities				: [],
	cities             		: [],
    searchText       		: '',
    selectedCityIds  	 	: [],
    cityDialog    			: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,	
};

const citiesReducer = (state = initialState, action) => {
	switch(action.type){
		case Actions.GET_CITIES:
		{
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
				cities: action.payload,
            };
		}	
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }	
        case Actions.TOGGLE_IN_SELECTED_CITIES:
        {

            const cityId = action.cityId;

            let selectedCityIds = [...state.selectedCityIds];

            if ( selectedCityIds.find(id => id === cityId) !== undefined )
            {
                selectedCityIds = selectedCityIds.filter(id => id !== cityId);
            }
            else
            {
                selectedCityIds = [...selectedCityIds, cityId];
            }

            return {
                ...state,
                selectedCityIds: selectedCityIds
            };
        }
        case Actions.SELECT_ALL_CITIES:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedCityIds = arr.map(city => city.id);

            return {
                ...state,
                selectedCityIds: selectedCityIds
            };
        }
        case Actions.DESELECT_ALL_CITIES:
        {
            return {
                ...state,
                selectedCityIds: []
            };
        }
        case Actions.OPEN_NEW_CITY_DIALOG:
        {
            return {
                ...state,
                cityDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_CITY_DIALOG:
        {
            return {
                ...state,
                cityDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CITY_DIALOG:
        {
            return {
                ...state,
                cityDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CITY_DIALOG:
        {
            return {
                ...state,
                cityDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
		case Actions.WAIT_CITIES:
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

export default citiesReducer;