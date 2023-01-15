import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities       			: [],
    routeParams    			: {},
    selectedClusterProductIds	: [] ,
    searchText     			: '',
    categories     			: [],
    categoryLabels 			: [],
	clusterProduct				: [],
	clusterlist					: [],
	clusterSelected				: '',
};

const clusterProductsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CLUSTERPRODUCTS:
        {

            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
                routeParams: action.routeParams
            };
        }
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                categories   	: action.payload.categories,
                categoryLabels	: action.payload.categoryLabels,
            };
        }
        case Actions.GET_CLUSTER:
        {
            return {
                ...state,
                clusterlist   	: action.payload,
            };
        }
        case Actions.SELECT_CLUSTER:
        {
            return {
                ...state,
                clusterSelected   	: action.payload,
            };
        }
        case Actions.UPDATE_CLUSTERPRODUCTS:
        {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.SELECT_ALL_CLUSTERPRODUCTS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedClusterProductIds = arr.map(clusterProduct => clusterProduct.id);

            return {
                ...state,
                selectedClusterProductIds
            };
        }
        case Actions.DESELECT_ALL_CLUSTERPRODUCTS:
        {
            return {
                ...state,
                selectedClusterProductIds: []
            };
        }
        case Actions.SELECT_CLUSTERPRODUCTS_BY_PARAMETER:
        {
            const filter = action.payload;
            const arr = Object.keys(state.entities).map(k => state.entities[k]);
            const selectedClusterProductIds = arr.filter(clusterProduct => clusterProduct[filter.parameter] === filter.value)
                .map(clusterProduct => clusterProduct.id);
            return {
                ...state,
                selectedClusterProductIds
            };
        }
        case Actions.TOGGLE_IN_SELECTED_CLUSTERPRODUCTS:
        {

            const clusterProductId = action.clusterProductId;

            let selectedClusterProductIds = [...state.selectedClusterProductIds];

            if ( selectedClusterProductIds.find(id => id === clusterProductId) !== undefined )
            {
                selectedClusterProductIds = selectedClusterProductIds.filter(id => id !== clusterProductId);
            }
            else
            {
                selectedClusterProductIds = [...selectedClusterProductIds, clusterProductId];
            }

            return {
                ...state,
                selectedClusterProductIds
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
            return state;
    }
};

export default clusterProductsReducer;
