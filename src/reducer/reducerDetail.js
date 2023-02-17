import Constants from "../constants/Constants";

const initialState = {
    userDetail: {},
}

export default function (state = initialState, action) {
    const { type, value } = action;
    switch (type) {
        case Constants.reducerActions.login:
            return { ...state, ...value };
        default:
            return state;
    }
}