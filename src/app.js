const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const hbs = require('hbs')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup express directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather application',
        name: 'Amrit Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Amrit Sharma'
    })
}
)

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        HelpText: 'Sample message text',
        name: 'Amrit Sharma'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'pls send address details'})

    }

    geocode(req.query.address,(error, {longitude,latitude,location} = {})=> {
        if(error){
            return res.send({error})
        
        }

        forecast(latitude,longitude, (error, forecastData)=> {
            if(error) {
                return res.send({error})
      
            }
            console.log(longitude)
        res.send({
            forecast:forecastData,
            location,
            address : req.query.address
        })

        })
    })

    // res.send({
    //     forecast: 'It is cloudy',
    //     location: 'Bangalore',
    //     address: req.query.address

    // })
})

//only one response can send to client. that's why RETURN is used
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*splat', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amrit Sharma',
        errorMessage: 'Help article not found'
    })

})

app.get('*splat', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amrit Sharma',
        errorMessage: 'Page not found'

    })
})

//start server
app.listen(3000, () => {
    console.log('server is up at port 3000')
})