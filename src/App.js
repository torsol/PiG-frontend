import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import Map from './Map'

const App = (props) => {

    const [layers, setLayers] = useState([])

    useEffect(() => {
        console.log('state updated')
      }, [layers]);

    return (
        <div>
            <Sidebar setLayers={setLayers}/>
            <Map layers = {layers} />
        </div>
    )

};

export default App