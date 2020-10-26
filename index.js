const handler = require('./lambda.js') 

const eventData = require('./event.json')

handler.handler(eventData)


let destY = -77
let startY = 33
let destX = 175
let startX = 8

function hexCalc(startX, startY, destX, destY){
    let answer = 0
    let valOne = Math.abs(startY - destY)
    let valTwo = Math.abs(startY + startX - destY - destX)
    let valThree = Math.abs(startX - destX)

    answer = valOne + valTwo + valThree
    console.log(answer/2)
}

hexCalc(startX, startY, destX, destY)


