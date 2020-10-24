
exports.handler = async (event) => {
    let res = {}

    let eventData = event
    //GET_METHOD
    if (event.httpMethod === 'GET') {

        //TODO add in Param to pick different requests

        //null check on api Params
        if(event.queryStringParameters != null){
            
            //TODO
            //check for case of the keys as lowercase 'speed' fails request
            
            //set params to var so we can parce them into numbers
            //using logic to get around case in json keys 'Speed' vs 'speed'
            let dataPointSpeed = ("Speed" in eventData.queryStringParameters) ? parseInt(event["queryStringParameters"]["Speed"]) :parseInt(event["queryStringParameters"]["speed"])
            let dataPointDistance = ("Distance" in eventData.queryStringParameters) ? parseInt(event["queryStringParameters"]["Distance"]) : parseInt(event["queryStringParameters"]["Distance"])

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
