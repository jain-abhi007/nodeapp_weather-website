const request = require('request')

const forecast = (lat, lon, callback) => {                                                            
    const url = 'http://api.weatherstack.com/current?access_key=0c0dff3391c04204eeb1023dd03a1ee3&query='+ lat + ',' + lon

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined)
        }else if (body.error) {
            callback('Improper request, Unable to find location', undefined)
        }
        else{
            callback(error, {
                data : body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress.'
            })
        }
    })
}

module.exports = forecast