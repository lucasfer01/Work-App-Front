import React, {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addAlerts } from '../../controllers';
import { useEffect } from 'react';

const AlertaEmpleo = () => {
    const myAlerts = useSelector((state) => state.profile.ownProfile?.usr_alerts);

    console.log("my alerts", myAlerts);

    const [newAlert, setNewAlert] = useState("");

    const [alerts, setAlerts] = useState({
        usr_alerts: [],
    });
    const { uid } = useSelector((state) => state.auth);
    console.log(uid);

    const [jobList, setJobList] = useState([]);

    const jobs = useSelector((state) => state.jobs.allJobs);
    const jobNames = jobs.map((job) => job.job_name);

    console.log("all job alerts", jobs);
    

    useEffect(() => {
        setAlerts({
            usr_alerts: myAlerts,
        });
    }, [myAlerts]);
    
    const handleChange = (e) => {
        const { value } = e.target;
        const filteredJobs = jobNames.filter((j) => j.includes(value));
        setNewAlert(value);
        setJobList(filteredJobs);
        console.log("filtered jobs", filteredJobs);
    };

    const handleAddJob = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setAlerts({
            ...alerts,
            usr_alerts: [...alerts.usr_alerts, value]
        });
        setNewAlert("");
        setJobList([]);
    };

    const handleQuitJob = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setAlerts({
            ...alerts,
            usr_alerts: alerts.usr_alerts.filter(p => p !== value)
        });
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
                                <input type="button" value={job.job_name} onSubmit={handleAddJob} />
                            </div>
                        ))
                    }
                    {
                        alerts.usr_alerts?.map(alert => (
                            <p>{alert} <button onClick={handleQuitJob}>X</button></p>
                        ))
                    }
                    <button onClick={handleSubmit} > Enviar </button>
                </form>
            </div>
        </div>
    )
};

export default AlertaEmpleo;