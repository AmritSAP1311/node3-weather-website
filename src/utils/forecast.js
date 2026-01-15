const request = require('request') 
const chalk = require('chalk')
// const url = 'http://api.weatherstack.com/current?access_key=428f3c4b019fb40b589c8e9787ee7fc7&query=12.9629,77.5775&units=m'

const forecast = (latitude, longitude, callback)=>{

// const url = 'http://api.weatherstack.com/current?access_key=428f3c4b019fb40b589c8e9787ee7fc7&query=30.6899,76.8484&units=m'  //chandigarh
const url = 'http://api.weatherstack.com/current?access_key=f482fa9a10225b9eb8223df829342163&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

// console.log(url)

request({ url, json: true }, (error, {body}) => {


    if (error) {
        console.log()
        callback('unable to connect to web service!', undefined)
    } else if (body.error) {
        console.log(longitude)
        console.log(latitude)
        callback('unable to find location', undefined)
    } else {

        data = body.current.weather_descriptions[0] + ' weather in ' + body.location.name + '. It is currently ' + body.current.temperature +
            ' degree out. Its feelslike ' + body.current.feelslike + ' degree out.'
        
            callback(undefined, data)

    }


})

}

module.exports = forecast