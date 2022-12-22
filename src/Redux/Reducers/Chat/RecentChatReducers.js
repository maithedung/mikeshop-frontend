import {
    ADD_RECENT_CHAT, NEW_CREATED_CHAT, RECENT_ERROR, RECENT_LOADING,
} from "../../Actions/Chat/RecentChatActions";

const initState = {
    recent_chat: [], loading: true, error: false,
};
export const recentChatReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case ADD_RECENT_CHAT:
            return {
                ...state, recent_chat: payload, loading: false, error: false,
            };
        case NEW_CREATED_CHAT:
            return {
                ...state, recent_chat: [payload, ...state.recent_chat], loading: false, error: false,
            };
        case RECENT_ERROR:
            return {...state, error: payload};
        case RECENT_LOADING:
            return {...state, loading: payload};
        default:
            return state;
    }
};
