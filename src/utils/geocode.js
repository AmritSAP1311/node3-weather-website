request = require('request')

const geocode = (geocode, callback) => {
        // console.log('inside geocode')
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(geocode) + '&access_token=pk.eyJ1IjoiYW1yaXQzMTEiLCJhIjoiY21qc2R4bTYyNDVhZDNlcXo4N2oyaWQ1dSJ9.1k5IFSsyeIEvduvk96Fv6A&limit=1'
    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find loication. try another search!', undefined)

        } else {
        //    console.log(url)
            callback(undefined,  data = {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.full_address
            })
        }

    })
}

module.exports = geocode