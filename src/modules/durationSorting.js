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

module.exports = bubbleSortDuration
