import axios from 'axios'

const sampleJson = {
    "value": 10,
    "layers":
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                5.47119140625,
                                62.160371743742886
                            ],
                            [
                                8.228759765625,
                                62.160371743742886
                            ],
                            [
                                8.228759765625,
                                63.34720142876015
                            ],
                            [
                                5.47119140625,
                                63.34720142876015
                            ],
                            [
                                5.47119140625,
                                62.160371743742886
                            ]
                        ]
                    ]
                }
            }
        ]
    }
}


function calculateBuffer(e, item) {
    axios
        .post('http://localhost:5000/api/buffer', sampleJson)
        .then(response => {
            window.alert(JSON.stringify(response.data));
        })
        .catch(function (error) {
            // manipulate the error response here
        });
}

export default calculateBuffer