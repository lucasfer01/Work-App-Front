import axios from 'axios';

export const getJobs = async () => {
    const { data } = await axios('http://localhost:3001/job');
    return data;
}

export const getPosts = async () => {
    /* const  {data}  = await axios('http://localhost:3001/post');
    return data; */
    return [
        {
            post_id: 1,
            post_title: 'Job 1',
            post_description: 'Descripción de uso provisorio.',
            post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
            post_type: 'contratar',
            post_priority: "urgente",
            post_fee: "100",
        },
        {
            post_id: 2,
            post_title: 'Job 2',
            post_description: 'Descripción de uso provisorio.',
            post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
            post_type: 'contratar',
            post_priority: "urgente",
            post_fee: "100",
        },
        {
            post_id: 3,
            post_title: 'Job 3',
            post_description: 'Descripción de uso provisorio.',
            post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
            post_type: 'contratar',
            post_priority: "urgente",
            post_fee: "100",
        },
        {
            post_id: 4,
            post_title: 'Job 4',
            post_description: 'Descripción de uso provisorio.',
            post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
            post_type: 'contratar',
            post_priority: "urgente",
            post_fee: "100",
        },
        {
            post_id: 5,
            post_title: 'Job 5',
            post_description: 'Descripción de uso provisorio.',
            post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
            post_type: 'contratar',
            post_priority: "urgente",
            post_fee: "100",
        },
    ]
}

export const getPostDetail = async (id) => {
    /* const  {data}  = await axios(`http://localhost:3001/post/${id}`);
    return data; */
    return {
        post_id: 1,
        post_title: 'Job 1',
        post_description: 'Descripción de uso provisorio.',
        post_photo: "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2019/03/cutie-scaled-1120x630.jpg",
        post_type: 'contratar',
        post_priority: "urgente",
        post_fee: "100",
        createdAt: "2020-05-05T00:00:00.000Z",
        updatedAt: "2020-05-05T00:00:00.000Z",
    }

}