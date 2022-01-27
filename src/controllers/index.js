// Importamos axios
import axios from 'axios';
// Urls
import { POST_URL, JOB_URL, POST_USER } from '../enviroment';
import { BASE_URL } from '../enviroment';

// Obtener todos los oficios
export const getJobs = async () => {
    // Peticion de todos los oficios
    const { data } = await axios.get(JOB_URL);
    return data;
}

// Obtener todos los posts
export const getPosts = async () => {
    // Hacemos peticion de todos los posts
    const { data } = await axios.get(POST_URL);

    // Retornamos el resultado
    return data;


    // axios.get(POST_URL)
    // .then(resultado => {return resultado.data})

    // return [
    //     {
    //         post_id: 1,
    //         post_title: 'Job 1',
    //         post_description: 'Descripción de uso provisorio.',
    //         post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
    //         post_type: 'contratar',
    //         post_priority: "urgente",
    //         post_fee: "100",
    //     },
    //     {
    //         post_id: 2,
    //         post_title: 'Job 2',
    //         post_description: 'Descripción de uso provisorio.',
    //         post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
    //         post_type: 'contratar',
    //         post_priority: "urgente",
    //         post_fee: "100",
    //     },
    //     {
    //         post_id: 3,
    //         post_title: 'Job 3',
    //         post_description: 'Descripción de uso provisorio.',
    //         post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
    //         post_type: 'contratar',
    //         post_priority: "urgente",
    //         post_fee: "100",
    //     },
    //     {
    //         post_id: 4,
    //         post_title: 'Job 4',
    //         post_description: 'Descripción de uso provisorio.',
    //         post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
    //         post_type: 'contratar',
    //         post_priority: "urgente",
    //         post_fee: "100",
    //     },
    //     {
    //         post_id: 5,
    //         post_title: 'Job 5',
    //         post_description: 'Descripción de uso provisorio.',
    //         post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
    //         post_type: 'contratar',
    //         post_priority: "urgente",
    //         post_fee: "100",
    //     },
    // ]
}

// Obtener post por id
export const getPostDetail = async (id) => {
    // Hacemos peticion de post a backend con id
    const { data } = await axios.get(`${POST_URL}/${id}`);

    // Retornamos el resultado
    return data;

    // return {
    //     post_id: 1,
    //     post_title: 'Job 1',
    //     post_description: 'Descripción de uso provisorio.',
    //     post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
    //     post_type: 'contratar',
    //     post_priority: "urgente",
    //     post_fee: "100",
    //     createdAt: "2020-05-05T00:00:00.000Z",
    //     updatedAt: "2020-05-05T00:00:00.000Z",
    // }

}

export const getProfile = async (userId) => {
    try {
        const {data} = await axios.get(`${POST_USER}/${userId}`);
        return data;   
    } catch (error) {
        console.log(error);
    }
}

export const addAlerts = async (uid, alerts) => {
    try {
        const {data} = await axios.put(`${BASE_URL}/user/${uid}`, alerts);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const sendEmail = async (postData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/email`, postData)
        return data;
    } catch (error) {
        console.log(error);
    }
}
