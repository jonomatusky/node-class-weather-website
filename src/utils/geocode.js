const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9ub21hdHVza3kiLCJhIjoiY2p0b3N0cGp3MDl3ajQzbHhvdnVlNnJyeiJ9.HhpB1ODM_2_4LZkZbCSW2g&limit=1'

    request ({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],   
                location: body.features[0].place_name             
            })
        }
    })
}

module.exports = geocode