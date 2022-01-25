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

function Ascendente (a, b){
  var A = a.distancia; 
  var B = b.distancia; 
  if (A<B) return -1; 
  if (A>B) return 1; 
  return 0; 
}

function Descendente (a, b){
  var A = a.distancia; 
  var B = b.distancia; 
  if (A>B) return -1; 
  if (A<B) return 1; 
  return 0; 
}



export default function OrdenadorDistancia(arreglo, usuario, orden){
  var miUbicacion = usuario.usr_location; 

  var postUbicacion = arreglo.map(post => {
    return {
      perfil: getProfile(post.usr_id),
      post: post, 
      distancia: 0,
    }
  })

  postUbicacion.forEach(element => {
    var suUbicacion = element.perfil.usr_location; 
    if (suUbicacion){ element.distancia = haversine_distance(miUbicacion, suUbicacion)}
    else {element.distancia = 1000}
  });

  if(orden === 'Ascendente')return postUbicacion.sort(Ascendente);
  else {return postUbicacion.sort(Descendente)} 
}