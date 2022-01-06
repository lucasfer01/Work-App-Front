import axios from 'axios';

export const getJobs = async () => {
    const  {data}  = await axios('http://localhost:3001/job');
    return data;
    /* return [
        {
            job_id: 1,
            job_name: "pintor",
            job_description: "pintura de casas a domicilio",
        },
        {
            job_id: 2,
            job_name: "carpintero",
            job_description: "realizaciön de banquitos",
        },
        {
            job_id: 2,
            job_name: "plomero",
            job_description: "reparaciön de baños",
        },
    ] */
}