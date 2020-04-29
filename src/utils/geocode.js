const request=require('request')

const geoCode=(address,callback)=>{
    const mapbox_key='pk.eyJ1IjoiZmlzY2hlcmpjIiwiYSI6ImNrOTlyczE5cjFqb3czcGxjMmdyd250OXQifQ.AmEGsTZuNmPyTM-23mVxxg'
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token='+mapbox_key+'&limit=1'
    const data={
        latitude: 0,
        longitude: 0,
        Location:''
    }
    request({url: geocodeURL,json: true},(error, response, body)=>{
        if(error) {
            callback('Unable to connect to location services',undefined)
        } else if (body.features.length===0) {
            callback('Location not found by location services',undefined)
        } else {
            data.latitude=body.features[0].center[1]
            data.longitude=body.features[0].center[0]
            data.Location=body.features[0].place_name
            callback(undefined,data)
        }
    })
}


module.exports=geoCode