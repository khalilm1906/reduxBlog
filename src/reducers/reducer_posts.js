import { FETCH_POSTS } from '../actions/index';
import { FETCH_POST } from '../actions/index';
import { DELETE_POST } from '../actions/index';


const INITIAL_STATE = { allPosts: [], activePost: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, allPosts: action.payload.data };
    case FETCH_POST:
      return { ...state, activePost: action.payload.data };
    default:
      return state;
  }
}
