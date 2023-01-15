import * as Actions from '../actions';

const initialState = {
    data: [],
	center: []
};


const heatmapReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_HEATMAP:
        {
            return {
                ...state,
                data: action.payload
            };
        }	
        case Actions.SET_HEATMAP:
        {
            return {
                ...state,
                center: action.payload
            };
        }		
        default:
        {
            return state;
        }
    }
};

export default heatmapReducer;