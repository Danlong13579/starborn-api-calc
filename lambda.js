const F = require('./functions')

exports.handler = async (event) => {
    let res = {}
    let jsonBody = ""

    let dataPointSpeed = parseInt(event["queryStringParameters"][F.MatchString("speed", event["queryStringParameters"])])
    let dataPointDistance = parseInt(event["queryStringParameters"][F.MatchString("distance", event["queryStringParameters"])])

    let cordsData = F.MatchCords(event["queryStringParameters"][F.MatchString("cords", event["queryStringParameters"])])
    let cords = cordsData.map(num => parseInt(num, 10))
    let distance = F.HexDist(cords)
    //GET_METHOD
    if (event.httpMethod != null) {
        if(event.httpMethod === "GET"){
            if(event.queryStringParameters != null){
                res = {
                    statusCode: 200,
                    body: JSON.stringify({
                        "message": "Request accepted",
                        "eventParams": event.queryStringParameters,
                        "eventParamsArray": event.multiValueQueryStringParameters
                    })
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
