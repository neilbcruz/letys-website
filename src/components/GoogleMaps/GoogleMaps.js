import './GoogleMaps.scss';

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '50vh'
};

const markers = [
    {
        id: 1,
        name: "Lety's Buko Pie - Main Store",
        position: { lat: 14.181547311058496, lng: 121.23095642865529 }
    },
    {
        id: 2,
        name: "Lety's Buko Pie - Agapita Branch",
        position: { lat: 14.172583606639034, lng: 121.24338540478081 }
    },
    {
        id: 3,
        name: "Lety's Buko Pie - Shell Branch",
        position: { lat: 14.181495274068771, lng: 121.22921137169689 }
    },
    {
        id: 4,
        name: "Lety's Buko Pie - Pansol Branch",
        position: { lat: 14.181740807212035, lng: 121.17813891167624 }
    }
];

// const APIKEY = process.env.API_KEY;

export default function GoogleMaps() {
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <>
            <LoadScript
                googleMapsApiKey={APIKEY}
                // googleMapsApiKey='AIzaSyCfeaOaN3OF4kmuGfRbH6yfmtLbnNE9_Sg'
            >
                <GoogleMap
                    onLoad={handleOnLoad}
                    onClick={() => setActiveMarker(null)}
                    mapContainerStyle={containerStyle}
                    // zoom={50}
                >
                    {markers.map(({ id, name, position }) => (
                        <Marker
                            key={id}                            
                            position={position}
                            onClick={() => handleActiveMarker(id)}
                        >
                            {activeMarker === id ? (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    <div>{name}</div>
                                </InfoWindow>
                            ) : null}
                        </Marker>
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    )
}