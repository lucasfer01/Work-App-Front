// importamos axios
import axios from 'axios';
// url
import { JOB_URL } from '../enviroment';

export const getJobs = () => {
    
        axios.get(JOB_URL)
            .then(jobs => jobs.data)
            .then(data => data.data)
            .catch(e => console.log(e));
        
} 