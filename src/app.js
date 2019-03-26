const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jono Matusky'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jono Matusky'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a helpful message',
        title: 'Help',
        name: 'Jono Matusky'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const location = req.query.address

    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Jono Matusky'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: '404: File Not Found',
        title: '404',
        name: 'Jono Matusky'
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})