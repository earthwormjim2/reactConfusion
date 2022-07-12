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
        default:
            return state;
    }
}