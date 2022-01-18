import React, {useState} from 'react';
import axios from 'axios';

const AlertaEmpleo = () => {

    const [job, setJob] = useState({
        email: "",
        empleo: "",
    });

    const getAlert = async (input) => {
        const res = await axios.post("localhost:3000/email", input);
        console.log(res)
        return res;
    };
    
    const handleSubmit = (input) => {
        getAlert(input);
        setJob({});
        // alert("Se ha creado su alerta de empleo");
        console.log("Input enviado", input);
    };

    return (
        <div>
            <div>
                <form>
                    <input placeholder="E-mail" value="email" />
                    <input placeholder="Empleo a alertar..." value="empleo" />
                    <button onClick={handleSubmit()} >Enviar </button>
                </form>
            </div>
        </div>
    )
};

export default AlertaEmpleo;