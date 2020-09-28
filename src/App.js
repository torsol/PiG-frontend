import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import Map from './Map'

const App = (props) => {

    const [layers, setLayers] = useState([])

    const addLayerToState = (layers, setLayers) => {
        return (newValue) => {
            console.log("addLayerToState")
            console.log(newValue, layers, setLayers)
            setLayers([...layers, newValue])
        }
    } 

    useEffect(() => {
        console.log('App', 'State updated')
      }, [layers]);

    return (
        <div>
            <Sidebar addLayerToState={addLayerToState(layers, setLayers)}/>
            <Map layers ={layers} />
        </div>
    )

};

export default App