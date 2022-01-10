import { types } from "../types/types";

const initialState = {
    user: [],
    jobs: [],
    posts: [],
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.profileUser:
            return { ...state,
                user: action.payload
                }
        case types.profileJobs:
            return{ ...state,
                jobs: action.payload
            }
        case types.profilePosts:
            return{ ...state,
            posts: action.payload
        }
        default: 
        return state
    }
}