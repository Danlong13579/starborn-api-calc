const F = require('./functions')

exports.handler = async (event) => {
    let res = {}

    let dataPointSpeed = parseInt(event["queryStringParameters"][F.MatchString("speed", event["queryStringParameters"])])
    let dataPointDistance = parseInt(event["queryStringParameters"][F.MatchString("distance", event["queryStringParameters"])])

    let cordsData = F.MatchCords(event["queryStringParameters"][F.MatchString("cords", event["queryStringParameters"])])
    let cords = cordsData.map(num => parseInt(num, 10))
    let distance = F.HexDist(cords)
    //GET_METHOD
    if (event.httpMethod != null) {
        if(event.httpMethod === "GET"){
            if(event.queryStringParameters != null){
                if (event["queryStringParameters"]['hasCords'] == null || event["queryStringParameters"]['hasCords'] === "false" || event["queryStringParameters"]['hasCords'] === "FALSE"){
                    if(event["queryStringParameters"]['hasArrivalTime'] == null || event["queryStringParameters"]['hasArrivalTime'] === "false" || event["queryStringParameters"]['hasArrivalTime'] === "FALSE"){
                        console.log('no cord, no arrival time')
                        
                    }
                    else{
                        console.log('no cords, has arival time')
                    }
                }
                else{
                    if(event["queryStringParameters"]['hasArrivalTime'] == null || event["queryStringParameters"]['hasArrivalTime'] === "false" || event["queryStringParameters"]['hasArrivalTime'] === "FALSE"){
                        console.log('has cords, no arival time')
                    }
                    else{
                        console.log('has cords, has arival time')
                    }
                }
                return res
            }
            else {
                res = {
                    statusCode: 400,
                    body: JSON.stringify({
                        "message": "No params or malformed syntax",
                        "paramsList": {
                            "speed" : "22",
                            "distance": "44",
                            "defaultParams" : {
                                "hasCords" : "false",
                                "hasArrivalTime" : "false"
                            }
                        }
                    })
                }
                return res
            }

        }
        else {
            res = {
                statusCode: 405,
                body: JSON.stringify({
                    "message": "Only GET methods are allowed please see ReadMe file for a list of params and calls",
                    "url": "https://github.com/Danlong13579/starborn-api-calc",
                    "httpMethod": event.httpMethod
                })
            }
            return res
        }
    } 
    else {
        res = {
            statusCode: 400,
            body: JSON.stringify({
                "message": "No http method used"
            })
        }
        return res
    }
}
