// impprtamos axios
import axios from 'axios';
// url post
import { POST_URL } from '../enviroment';


// Post 
export const postPost = async (dataPost) =>  {
    // post data
    const { data } = await axios.post(POST_URL, {...dataPost});
        
    return data;
}