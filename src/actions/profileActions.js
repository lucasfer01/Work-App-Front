import axios from 'axios'
import { types } from '../types/types'
import { POST_USER } from '../enviroment'

export function profileUser(userId) {
    return async function (dispatch) {
        /* axios.get(`${POST_USER}/${userId}`)
            .then((user) => {
                dispatch({
                    type: types.profileUser,
                    payload: user.data
                })
            })
            .catch((error) => {
                console.log(error)
            }) */
            try {
                const {data} = await axios.get(`${POST_USER}/${userId}`)
                dispatch({
                    type: types.profileUser,
                    payload: data
                })
            } catch (error) {
                console.log(error);
            }
    }
}

export function editProfile(userId, data) {
    return function (dispatch) {
        dispatch({
            type: types.editProfile,
            payload: { userId, data }
        })
    }
}
