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
            <div className='div-fil'>
               <span className='priority'>Prioridad: </span>
                <select className='select-fil' onChange={(event)=>setFiltro({...filtro, Prioridad: event.target.value})}>
                    <option className='options' value=''>Todos</option>
                    <option className='options' value='Urgente'>Urgente</option>
                    <option className='options' value='Poco Urgente'>Poco Urgente</option>
                    <option className='options' value='Sin Urgencia'>Sin Urgencia</option>
                </select>
            </div>
            <div className='div-dist'>
                <span className='distan'>Distancia:</span> 
                <input type='range'/>
            </div>
        </div>
    )
}

function Filtrado(datos,filtros){
    if(filtros.Prioridad){datos = datos.filter((post)=> { console.log("entro al if"); if(post.post_priority) return post.post_priority === filtros.Prioridad})}
    return datos;
}