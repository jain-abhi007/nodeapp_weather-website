const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()  //creating an express application instance
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,  '../templates/views')
const partialsPath = path.join(__dirname,  '../templates/partials')

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//get Methods
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Aj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhishek Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is helpful text',
        title: 'Help Portal',
        name: 'Aj'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address in a query'
        })
    }
    geocode(req.query.address, (error,{ latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({
              error
          })
        }
        forecast(latitude, longitude, (error, {data}) => {
          if (error) {
            return res.send({
                error
            })
          }
          res.send({
            forecast : data,
            location,
            address : req.query.address
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
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aj',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aj',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port: ', port)
})
