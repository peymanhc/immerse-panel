import {combineReducers} from 'redux';
import posts from './posts.reducer';
import post from './post.reducer';

const reducer = combineReducers({
    posts,
    post,
});

export default reducer;
