import React, {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addAlerts } from '../../controllers';

const AlertaEmpleo = () => {

    const [newAlert, setNewAlert] = useState("");

    const [alerts, setAlerts] = useState({
        usr_alerts: [],
    });
    const { uid } = useSelector((state) => state.auth);
    console.log(uid);

    const [jobList, setJobList] = useState([]);

    const jobs = useSelector((state) => state.jobs.allJobs);
    
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
        const add = async () => {
            await addAlerts(uid, alerts);
        }
        add();
        alert("Alertas agregadas");
        setNewAlert("");
    };

    return (
        <div>
            <h2>Agregar alertas</h2>
            <div>
                <form>
                    <input placeholder="Empleo a alertar..." onChange={handleChange} value={newAlert}/>
                    {
                        jobList?.map(job => (
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