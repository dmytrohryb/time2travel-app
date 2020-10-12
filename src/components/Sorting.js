const comparisonDate = (date1, date2) => {
    if(date1.length !== 0 && date2.length !== 0){
        if(parseInt(date1.substr(6, 4)) > parseInt(date2.substr(6, 4))){
            return false
        }
        if(parseInt(date1.substr(4, 2)) > parseInt(date2.substr(4, 2))){
            return false
        }
        if(parseInt(date1.substr(0, 2)) > parseInt(date2.substr(0, 2))){
            return false
        }
    }
    return true
}

const bubbleSort = (arrr, str) => {
    var arr = JSON.parse(JSON.stringify(arrr))
    for (let i = 0; i < arr.length - 1; i++) {
        let isSorted = false
        for(let j = 0; j < arr.length - 1 - i; j++){
            if((str === 'up') ? arr[j].price > arr[j + 1].price : arr[j].price < arr[j+1].price){
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

const bubbleSortDuration = (arrr, str) => {
    var arr = JSON.parse(JSON.stringify(arrr))
    for (let i = 0; i < arr.length - 1; i++) {
        let isSorted = false
        for(let j = 0; j < arr.length - 1 - i; j++){
            if((str === 'up') ? arr[j].duration > arr[j + 1].duration : arr[j].duration < arr[j+1].duration){
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

const bubbleSortDates = (arrr, str) => {
    var arr = JSON.parse(JSON.stringify(arrr))
    for (let i = 0; i < arr.length - 1; i++) {
        let isSorted = false
        for(let j = 0; j < arr.length - 1 - i; j++){
            if((str === 'up') ? !comparisonDate(arr[j].date, arr[j + 1].date) : comparisonDate(arr[j].date, arr[j + 1].date)){
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
module.exports = bubbleSortDuration
module.exports = bubbleSort
