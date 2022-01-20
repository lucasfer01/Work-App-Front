import React, {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AlertaEmpleo = () => {

    const [newAlert, setNewAlert] = useState("");

    const [alerts, setAlerts] = useState({
        usr_alerts: [],
    });
    const { uid } = useSelector((state) => state.auth);
    console.log(uid);

    const [jobList, setJobList] = useState([]);

    const jobs = useSelector((state) => state.jobs.allJobs);

    const getAlerts = async (alerts) => {
        const res = await axios.put(`http://localhost:3000/user/${uid}`, alerts);
        console.log(res.data)
        return res;
    };
    
    const handleChange = (e) => {
        const { value } = e.target;
        const job = jobs.filter(job => job.job_name.toLowerCase().includes(value.toLowerCase()));
        setJobList(job);
        setNewAlert(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAlerts(alerts => ({
            usr_alerts: [...alerts.usr_alerts, newAlert]
        }));
        getAlerts(alerts);
    };

    return (
        <div>
            <div>
                <form>
                    <input placeholder="Empleo a alertar..." onChange={handleChange} value={newAlert}/>
                    {
                        jobList.map(job => (
                            <div key={job.job_id}>
                                <input type="button" value={job.job_name} />
                            </div>
                        ))
                    }
                    <button onClick={handleSubmit} > Enviar </button>
                </form>
            </div>
        </div>
    )
};

export default AlertaEmpleo;