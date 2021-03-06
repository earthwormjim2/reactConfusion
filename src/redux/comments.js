import * as ActionTypes from './ActionTypes';


export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMess: null, comments: action.payload };
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return { ...state, comments: state.comments.concat(comment) };
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] };
        case ActionTypes.COMMENTS_LOADING:
            return { ...state, isLoading: true, errMess: null, comments: [] }
        default:
            return state;
    }
}