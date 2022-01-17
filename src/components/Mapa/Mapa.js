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
        center={position}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
       <Marker position={position}/>
        <></>
      </GoogleMap>
  ) : <></>
}