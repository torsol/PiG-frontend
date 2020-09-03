import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g';

const Application = (props) => {


    // initial coordinates for Trondheim
    const [lng, setLng] = useState(10.38);
    const [lat, setLat] = useState(63.43);
    const [zoom, setZoom] = useState(13);

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [lng, lat],
                zoom: zoom
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });

            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4))
                setLat(map.getCenter().lat.toFixed(4))
                setZoom(map.getZoom().toFixed(2))
            })
        };

        if (!map) initializeMap({ setMap, mapContainer });

    }, [map])

    return (
        <div>
            <div className='sidebarStyle'>
                <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
            </div>
            <div ref={el => mapContainer.current = el} className='mapContainer' />
        </div>
    )

};

ReactDOM.render(<Application />, document.getElementById('app'));