import axios from 'axios'
import { types } from '../types/types'
import {POST_USER} from '../enviroment'

export function profileUser(userId){
    return function(dispatch){
        axios.get(`http://localhost:3000/user/${userId}`)
        .then((user) =>{
            dispatch({
                type: types.profileUser,
                payload: user.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
}

export function editProfile(userId, data){
return function(dispatch){
    dispatch({
        type:types.editProfile,
        payload: {userId, data}
    })
}
}
