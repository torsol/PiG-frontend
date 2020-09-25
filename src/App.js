import React, { useState, useEffect, useRef } from 'react';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SettingsIcon from "@material-ui/icons/Settings";
import mapboxgl from 'mapbox-gl';
import Sidebar from './Sidebar';
import axios from 'axios'

mapboxgl.accessToken = 'pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g';

const App = (props) => {

    function onClick(e, item) {
        axios
            .get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
            .then(response => {
                window.alert(JSON.stringify(response.data));
            })
            .catch(function (error) {
                // manipulate the error response here
            });
    }

    const items = [
        { name: "solberGis", label: "solberGis", Icon: HomeIcon },
        {
            name: "Buffer",
            label: "Buffer",
            Icon: ReceiptIcon,
            items: [
                { name: "statements", label: "Statements", onClick },
                { name: "reports", label: "Reports", onClick }
            ]
        },
        "divider",
        {
            name: "settings",
            label: "Settings",
            Icon: SettingsIcon,
            items: [
                { name: "profile", label: "Profile" },
                { name: "insurance", label: "Insurance", onClick }
            ]
        }
    ];


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
            <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
            <Sidebar items={items} lng={lng} lat={lat} zoom={zoom} />
            <div ref={el => mapContainer.current = el} className='mapContainer' />
        </div>
    )

};

export default App