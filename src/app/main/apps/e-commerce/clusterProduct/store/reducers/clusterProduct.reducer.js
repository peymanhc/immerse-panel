import * as Actions from '../actions';

const initialState = null;

const clusterProductReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CLUSTERPRODUCT:
        {
            return {
                ...action.payload
            };
        }
        case Actions.UPDATE_CLUSTERPRODUCT:
        {
            return {
                ...action.payload
            };
        }
        default:
            return state;
    }
};

export default clusterProductReducer;
