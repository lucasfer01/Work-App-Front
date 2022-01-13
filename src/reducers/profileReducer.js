import axios from "axios";
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
            axios.put(`http://localhost:3000/user/${userId}`, data)
            return{
                ...state
            }
        default: 
        return state
    }
}