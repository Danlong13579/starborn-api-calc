const F = require('./functions')

exports.handler = async (event) => {
    let res = {}

    //GET_METHOD
    if (event.httpMethod === 'GET') {
        
        //null check on api Params
        if(event.queryStringParameters != null){
            
            let dataPointSpeed = parseInt(event["queryStringParameters"][F.MatchString("speed", event["queryStringParameters"])])
            let dataPointDistance = parseInt(event["queryStringParameters"][F.MatchString("distance", event["queryStringParameters"])])

            let cordsData = F.MatchCords(event["queryStringParameters"][F.MatchString("cords", event["queryStringParameters"])])
            let cords = cordsData.map(num => parseInt(num, 10))
            let distance = F.HexDist(cords)

            if(dataPointSpeed >= 1 && dataPointDistance >= 1){

                // starborn convets its time to seconds and rounds down
                let dataTime = dataPointDistance / dataPointSpeed
                let dataSeconds = dataTime * 3600 | 0 // <-- faster math.floor



                let jsonBody = JSON.stringify({
                    message: "Request aproved",
                    speed: dataPointSpeed,
                    distance: dataPointDistance,
                    TimeToHex: `${dataSeconds / 3600 | 0}:${dataSeconds % 3600 / 60 | 0}:${dataSeconds % 60 | 0} HH:MM:SS`
                })
                
                res = {
                    statusCode: 200,
                    body: jsonBody
                }

                console.log(distance)
                console.log(jsonBody)
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
