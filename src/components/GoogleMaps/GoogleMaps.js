import './GoogleMaps.scss';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '30rem'
};

const center = {
    lat: 14.181534560344444,
    lng: 121.23094523836086
};

const APIKEY = process.env.API_KEY;

export default function GoogleMaps() {

    return (
        <>
            <LoadScript
                // googleMapsApiKey={APIKEY}
                googleMapsApiKey='AIzaSyCfeaOaN3OF4kmuGfRbH6yfmtLbnNE9_Sg'
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                >
                <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </>
    )
}