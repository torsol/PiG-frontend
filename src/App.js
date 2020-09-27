import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Sidebar from './Sidebar';
import initializeMap from './Map'

mapboxgl.accessToken = 'pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g';

const App = (props) => {

    // react hooks for storing the map
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        if (!map) initializeMap({ setMap, mapContainer });
    // eslint-disable-next-line
    }, [map])

    return (
        <div>
            <Sidebar />
            <div ref={el => mapContainer.current = el} className='mapContainer' />
        </div>
    )

};

export default App