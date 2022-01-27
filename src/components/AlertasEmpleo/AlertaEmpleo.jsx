import React, {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addAlerts } from '../../controllers';
import { useEffect } from 'react';

const AlertaEmpleo = () => {
    const myAlerts = useSelector((state) => state.profile.ownProfile?.usr_alerts);

    console.log("my alerts", myAlerts);

    const [newAlert, setNewAlert] = useState("");

    const [alerts, setAlerts] = useState([]);
    const { uid } = useSelector((state) => state.auth);
    console.log(uid);

    const [jobList, setJobList] = useState([]);

    const jobs = useSelector((state) => state.jobs.allJobs);
    const jobNames = jobs.map((job) => job.job_name);

    console.log("all job alerts", jobNames);

    useEffect(() => {
        setAlerts(myAlerts);
    }, [myAlerts]);
    

    
    const handleChange = (e) => {
        const { value } = e.target;
        setNewAlert(value);
        const filteredJobs = newAlert !== "" ? jobNames.filter((j) => j.toLowerCase().includes(newAlert.toLowerCase())) : [];
        setJobList(filteredJobs);
    };

    const handleAddJob = (e) => {
        e.preventDefault();
        const { value } = e.target;
        if (!alerts.includes(value)) setAlerts([...alerts, value]);
        setNewAlert("");
        setJobList([]);
    };

    const handleQuitJob = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setAlerts(alerts.filter((a) => a.toLowerCase() !== value.toLowerCase()));
    };

    const handleSubmit = (e) => {
        const add = async () => {
            await addAlerts(uid, {usr_alerts: alerts});
        }
        add();
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
                            <div key={job}>
                                <input type="button" value={job} onClick={handleAddJob} />
                            </div>
                        ))
                    }
                    {
                        alerts?.map(alert => (
                            <p>{alert} <button value={alert} onClick={handleQuitJob}>X</button></p>
                        ))
                    }
                    <p>
                    <button onClick={handleSubmit} > Enviar </button>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default AlertaEmpleo;