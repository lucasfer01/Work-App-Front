import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, setFilters } from '../../actions/formEmpleador';
import './Filtros.css'

export default function Filtros({}){

    const dispatch = useDispatch();

    const [filtro, setFiltro] = React.useState({
        Prioridad: '',
    })
 
    const storePosts = useSelector(state => state.posts.allPosts); 

    React.useEffect(()=>{
        dispatch(getPosts()); 
    },[1])

    React.useEffect(async()=>{
        dispatch(setFilters(Filtrado(storePosts, filtro)))
    },[filtro, storePosts])

    return(
        <div className='filtros_main'>
            <div>
                Prioridad: 
                <select onChange={(event)=>setFiltro({...filtro, Prioridad: event.target.value})}>
                    <option value=''>Todos</option>
                    <option value='Urgente'>Urgente</option>
                    <option value='Poco Urgente'>Poco Urgente</option>
                    <option value='Sin Urgencia'>Sin Urgencia</option>
                </select>
            </div>
            <div>
                Distancia: 
                <input type='range'/>
            </div>
        </div>
    )
}

function Filtrado(datos,filtros){
    if(filtros.Prioridad){datos = datos.filter((post)=> { console.log("entro al if"); if(post.post_priority) return post.post_priority === filtros.Prioridad})}
    return datos;
}