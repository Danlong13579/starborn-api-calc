function MatchString(text, event ) {
    let jsonData = JSON.stringify(event)
    let regexTest = new RegExp(text, "i")
    let res = regexTest.exec(jsonData)
    return res[0]
}

let MatchCords = (cord) => {
    let jsonData = JSON.stringify(cord)
    let regexTest = new RegExp(/(-?[0-9]{1,3})/, "g")
    let res = jsonData.match(regexTest)
    return res
}

let HexDist = (cords) => {
    return (Math.abs(cords[1] - cords[3]) + Math.abs(cords[1] + cords[0] - cords[3] - cords[2]) + Math.abs(cords[0] - cords[2])) / 2
}

module.exports = { MatchString, MatchCords, HexDist }