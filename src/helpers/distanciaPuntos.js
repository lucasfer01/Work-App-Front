import {getProfile} from '../controllers/index'

function haversine_distance(mk1, mk2) {
    var R = 6371.0710 // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

export default function OrdenadorDistancia(arreglo, usuario, maximo){
  var miUbicacion = usuario.usr_location; 

  var postUbicacion =  arreglo.map( post => {
    return {
      perfil: {},
      post: post, 
      distancia: 0,
    }
  })
  
  async function llamarPerfil (){
    for(let ii = 0; ii < postUbicacion.length; ii++){
      const profile = await getProfile(postUbicacion[ii].post.usr_id)
      postUbicacion[ii].perfil = profile; 
    }
    postUbicacion.forEach(element => {
      var suUbicacion =  element.perfil.usr_location; 
      if (suUbicacion){ element.distancia = haversine_distance(miUbicacion, suUbicacion)}
      else {element.distancia = 60}
    }); 
    return postUbicacion.filter(elemento => {return elemento.distancia <= parseInt(maximo)}); 
  }

  return llamarPerfil(); 
}

// postUbicacion.filter(post=>post.distancia <= maximo)