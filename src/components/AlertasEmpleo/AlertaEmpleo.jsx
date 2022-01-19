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

    const getAlerts = async (alerts) => {
        const res = await axios.put(`http://localhost:3000/user/${uid}`, alerts);
        console.log(res.data)
        return res;
    };
    
    const handleChange = (e) => {
        setNewAlert(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAlerts(alerts => ({
            usr_alerts: [...alerts.usr_alerts, newAlert]
        }));
        console.log("alertas", alerts);
        getAlerts(alerts);
        console.log("Input enviado ", alerts);
    };

    return (
        <div>
            <div>
                <form>
                    <input placeholder="Empleo a alertar..." onChange={handleChange} value={newAlert}/>
                    <button onClick={handleSubmit} > Enviar </button>
                </form>
            </div>
        </div>
    )
};

export default AlertaEmpleo;