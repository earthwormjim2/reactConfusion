import * as ActionTypes from './ActionTypes';

export const FEEDBACK = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

export const Feedback = (state = FEEDBACK, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FEEDBACK_FORM:
            let newFormContents = state;
            newFormContents[action.payload.field] = action.payload.value;
            console.log("Field: " + action.payload.field + " Value: " + action.payload.value);
            return newFormContents;
        case ActionTypes.RESET_FEEDBACK_FORM:
            return ({
                firstname: '',
                lastname: '',
                telnum: '',
                email: '',
                agree: false,
                contactType: 'Tel.',
                message: ''
            });
        case ActionTypes.POST_FEEDBACK:
            return state;
            // created new case to explicitly
            // indicate we are *not* changing internal application 
            // state in this task given there is no ask to render feedback
        default:
            return state;
    }
}