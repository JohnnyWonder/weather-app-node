const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const getWeather=require('./utils/weather')

//define some path information
const pubDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//start the express app and get an instance
const app=express()
const port=process.env.PORT || 3000

//setup the view engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up the public folder for service
app.use(express.static(pubDir))


//set up default rout
app.get('',(req,res)=>{
    res.render('index',{
       title: 'Weather App',
       name: 'John Fischer, CISSP, CISA, CCSFP, CHQP, QSA' 
    })
})

//setup about route
app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'John Fischer, CISSP, CISA, CCSFP, CHQP, QSA'
    })
})

//set up help route
app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'John Fischer, CISSP, CISA, CCSFP, CHQP, QSA',
        help: 'To use the weather app you must provide a valid location.  Type "City, State" or "City" or "Zipcode" to get started.'
    })
})

//setup weather route
app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send( {
            error: 'Address must be provided'
        })
    }
    const loc=req.query.address

    geoCode(loc,(err,{latitude,longitude,Location}={}) =>{
        if(err) {
            return res.send({err})
        } 
        getWeather(latitude,longitude,(error,weather)=>{
            if (error){
                return res.send({error})
            } 
            res.send({
                forecast: 'Current temperature is: ' + weather.temperature + '. The current condition is: ' + weather.currentWeather + '. It feels like ' + weather.feelsLike,
                address: req.query.address,
                icon: weather.icon,
                Location
            }
                
            )
        })
    })

    // res.send({
    //     address: req.query.address,
    //     Location: 'Rockwall, TX',
    //     Forecast: 'Partly Cloudy, 60 degrees, and the wind is from the North at 17 MPH.'
    // })
})


//setup nested 404 page
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 - ERROR',
        message: '404 - Help article was not found',
        name: 'John Fischer, CISSP, CISA, CCSFP, CHQP, QSA',
    })
})

//setup 404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 - ERROR',
        message: '404 - Page not found',
        name: 'John Fischer, CISSP, CISA, CCSFP, CHQP, QSA',
    })
})

//start the express server on port 3000
app.listen(port, ()=>{
    console.log ('Server is running port' + port)
})