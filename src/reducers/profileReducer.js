import { types } from "../types/types";
import { profileUser } from "../actions/profileActions";

const initialState = {
    user: {},
    jobs: [],
    posts: [],
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.profileUser:
            console.log("reducer user", action.payload)
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