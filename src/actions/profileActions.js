import axios from 'axios'
import { types } from '../types/types'

export function profileUser(userId){
    return function(dispatch){
        axios.get(`http://localhost:3000/user/${userId}`)
        .then((user) =>{
            console.log("action user", user)
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
