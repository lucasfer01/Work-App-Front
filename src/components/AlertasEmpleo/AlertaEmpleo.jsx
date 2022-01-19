import React, {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-router-dom';

const AlertaEmpleo = () => {

    const [alerts, setAlerts] = useState({
        usr_alerts: [],
    });
    const { uid } = useSelector((state) => state.auth);

    const getAlerts = async (alerts) => {
        const res = await axios.put(`localhost:3000/user/${uid}`, alerts);
        console.log(res)
        return res;
    };
    
    const handleChange = (e) => {
        setAlerts({
            ...alerts,
            usr_alerts: [...usr_alerts, e.target.value]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getAlerts(alerts);
        setAlerts({});
        console.log("Input enviado ", alerts);
    };

    return (
        <div>
            <div>
                <form>
                    <input placeholder="Empleo a alertar..." onChange={handleChange} />
                    <button onClick={handleSubmit} > Enviar </button>
                </form>
            </div>
        </div>
    )
};

export default AlertaEmpleo;