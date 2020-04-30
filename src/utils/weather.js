const request=require('request')

const getWeather=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=f1aca8459d5f0423089d9de1437f2e84&query='+lat +','+long+'&units=f'
    request({url, json: true},(error,response,body)=>{
        const data = {
            currentWeather: '',
            temperature: 0,
            feelsLike: 0,
            windSpeed: '',
            icon: ''
        }
        if(error) {
            callback('Unable to connect to the weather service',undefined)
        } else {
            data.currentWeather=body.current.weather_descriptions[0]
            data.windSpeed=response.body.current.wind_speed
            data.temperature=response.body.current.temperature
            data.feelsLike=response.body.current.feelslike
            data.icon=body.current.weather_icons[0]
            callback(undefined,data)
        }
    })
}
module.exports=getWeather