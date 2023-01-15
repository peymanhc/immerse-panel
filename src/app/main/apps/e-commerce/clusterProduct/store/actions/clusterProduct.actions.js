import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_CLUSTERPRODUCT = '[CLUSTERPRODUCT APP] GET CLUSTERPRODUCT';
export const UPDATE_CLUSTERPRODUCT = '[CLUSTERPRODUCT APP] UPDATE CLUSTERPRODUCT';
export const TOGGLE_STAR = '[CLUSTERPRODUCT APP] TOGGLE STAR CLUSTERPRODUCT';
export const TOGGLE_IMPORTANT = '[CLUSTERPRODUCT APP] TOGGLE IMPORTANT CLUSTERPRODUCT';

export function getClusterProduct(routeParams)
{
    const request = axios.get('/api/clusterProduct-app/clusterProduct', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_CLUSTERPRODUCT,
                routeParams: routeParams,
                payload    : response.data
            })
        );
}

export function toggleStar(clusterProduct)
{
    const newClusterProduct = {
        ...clusterProduct,
        starred: !clusterProduct.starred
    };
    return (dispatch) => {
        dispatch({type: TOGGLE_STAR});
        return dispatch(updateClusterProduct(newClusterProduct));
    }
}

export function toggleImportant(clusterProduct)
{
    const newClusterProduct = {
        ...clusterProduct,
        important: !clusterProduct.important
    };

    return (dispatch) => {
        dispatch({type: TOGGLE_IMPORTANT});
        return dispatch(updateClusterProduct(newClusterProduct));
    }
}


export function updateClusterProduct(clusterProduct)
{
    const request = axios.put('/api/clusterProduct-app/update-clusterProduct', clusterProduct);

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : UPDATE_CLUSTERPRODUCT,
                    payload: response.data
                })
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
