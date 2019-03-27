const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0811f9308ad3e7354e2d3c0e3669d7d6/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(latitude)
    
    request ({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability*100 + '% chance of rain. The expected high is ' + body.daily.data[0].temperatureMax + ' and the expected low is ' + body.daily.data[0].temperatureMin + '.')
        }
    })
}

module.exports = forecast