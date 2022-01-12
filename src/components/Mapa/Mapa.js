import React from 'react'
import { GoogleMap, useJsApiLoader,Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '250px',
  height: '250px'
};

export default function Mapa({position}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAf33rszL-PaMcLx9peQiwUgdDFwJiBxLc"
  })

  const [map, setMap] = React.useState(null)
  const [state, setState] = React.useState({ lat: 0, lng: 0 })

  React.useEffect(()=>{
    var a = 1; 
    a += 1; 
    if (a > 20) return 0
    if(position){
      setState(position)}
    else {
        if (window.navigator) {
            window.navigator.geolocation.getCurrentPosition((pos=>setState({lat: pos.coords.latitude, lng: pos.coords.longitude})),(err=>alert("error al acceder a la ubicación: ", err.message))) 
        }
    }
    }, [position]) 

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={state}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
       <Marker position={state}/>
        <></>
      </GoogleMap>
  ) : <></>
}