const pramEvent = require('./event.json')

exports.handler = async (event) => {
    // TODO implement
    let res = {}
    
    //GET_METHOD
    if (event.httpMethod === 'GET') {
        if(event.queryStringParameters != null){
            
            let dataPointSpeed = parseInt(event["queryStringParameters"]["Speed"]) 
            let dataPointDistance = parseInt(event["queryStringParameters"]["Distance"])
            
            if(dataPointSpeed >= 1 && dataPointDistance >= 1){
                let dataTime = dataPointDistance / dataPointSpeed
                let dataSeconds = dataTime * 3600 | 0
                res = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: "Request aproved",
                        speed: dataPointSpeed,
                        distance: dataPointDistance,
                        TimeToHex: `${dataSeconds}s`,
                        eventsize: event
                    })
                }
                 console.log(dataSeconds)
                
                
            }else if (dataPointSpeed < 1){
                res = {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Invalid Speed param",
                        speedParam: dataPointSpeed
                    })
                }
            }
        }
        else
        {
            res = {
                statusCode: 400,
                    body: JSON.stringify({
                        message: "Missing param Speed & Distance"
                    })
            }
        }
        
        return res
    }
    
    // POST_METHOD
    if (event.httpMethod === 'POST') {
        res = {
            statusCode: 200,
            body: JSON.stringify(event.queryStringParameters)
        }
        return res
    }
}
