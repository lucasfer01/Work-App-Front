import axios from "axios";
import { POST_USER } from "../enviroment";
import { types } from "../types/types";

const initialState = {
    user: {},
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
        case types.editProfile:
            const {userId, data} = action.payload
            axios.put(`${POST_USER}/${userId}`, data)
            // window.location.href = `/profile/${userId}`
            return{
                ...state
            }
        default: 
        return state
    }
}