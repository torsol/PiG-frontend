import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g';

// initial coordinates for Trondheim
const lng = 10.38;
const lat = 63.43;
const zoom = 13;

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
};

export default initializeMap