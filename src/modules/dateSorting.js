const { DateTime } = require("luxon")

const firstMoreThanTheSecond = (d1, d2) => {
    let date1 = DateTime.fromISO(d1)
    let date2 = DateTime.fromISO(d2)
    return (date1 > date2) ? true : false
}

const convertDate = (date) => {
    return date[6] + date[7] + date[8] + date[9] + '-' + date[3] + date[4] + '-' + date[0] + date[1]
}

const bubbleSortDates = (arrr, str) => {
    var arr = JSON.parse(JSON.stringify(arrr))
    for (let i = 0; i < arr.length - 1; i++) {
        let isSorted = false
        for(let j = 0; j < arr.length - 1 - i; j++){
            if((str === 'up') ? firstMoreThanTheSecond(arr[j].date, arr[j + 1].date) : !firstMoreThanTheSecond(arr[j].date, arr[j + 1].date)){
                let swap = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = swap
                isSorted = true
            }
        }
        if(!isSorted) break
    }
    return arr
}

module.exports = bubbleSortDates
