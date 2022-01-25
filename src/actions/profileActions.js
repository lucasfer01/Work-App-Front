import axios from 'axios'
import { types } from '../types/types'
import { POST_USER } from '../enviroment'
import { finishLoading, startLoading } from './ui';

export function profileUser(userId, own) {
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
            dispatch(startLoading());
            try {
                const {data} = await axios.get(`${POST_USER}/${userId}`)
                dispatch({
                    type: own ? types.ownProfile : types.profileUser,
                    payload: data
                });
                dispatch(finishLoading())
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
