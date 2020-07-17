const axios = require('axios')
const cheerio = require('react-native-cheerio')

const URL1 = 'https://proydisvit.com'
const SHEDULE_URL1 = '/shedule?filter[date]='

const getList = async (date) => {

    const tempData = []

    const response = await axios.get(URL1 + SHEDULE_URL1 + date)

    const $ = cheerio.load(response.data)
    $('tr.tr-row').each((i, elem) => {
        if ($(elem).find('td.tr-date').text().substr(54, 5) + date.substr(5, 5) === date) {
            tempData.push({
                date: date,
                title: $(elem).find('td.tr-name a').text(),
                link: $(elem).find('td.tr-name a').attr('href'),
                price: $(elem).find('td.tr-price').text().substr(58, 69).replace(/\s/g, ''),
                location: $(elem).find('td.tr-location').text().substr(58, 40).replace(/\s/g, ''),
            })
        }
    })

    return tempData
}

const getDuration = async (link) => {

    let data;
    const response = await axios.get(URL1 + link)
    const $ = cheerio.load(response.data)
    let switcher = false
    $('table tr.travel_item:nth-child(1) td').each((i, elem) => {
        if(switcher){
            data = $(elem).text()
            switcher = false
        }
        if($(elem).text().match(/валість/g)){
            switcher = true
        }
    })

    return data
}

export const getDataProidysvit = async (date, duration, cost, cur) => {

    const data1 = await getList(date)
    const durations = []
    const result = []


    for (let i = 0; i < data1.length; i++) {
        durations.push(await getDuration(data1[i].link))
    }

    for (let i = 0; i < data1.length; i++){
        if(duration !== 0 && cost.min === '' && cost.max === ''){
            if(getDurationOnlyNum(durations[i]) === duration){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                    location: data1[i].location,
                    duration: getDurationOnlyNum(durations[i])
                })
            }
        }else if(duration === 0 && cost.min === '' && cost.max === ''){
            result.push({
                date: data1[i].date,
                title: data1[i].title,
                link: URL1 + data1[i].link,
                price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                location: data1[i].location,
                duration: getDurationOnlyNum(durations[i])
            })
        }else if(duration === 0 && cost.min !== '' && cost.max !== ''){
            if(Math.round(getPriceOnlyNum(data1[i].price, cur)) > cost.min && Math.round(getPriceOnlyNum(data1[i].price, cur)) < cost.max){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                    location: data1[i].location,
                    duration: getDurationOnlyNum(durations[i])
                })
            }
        }else if(duration === 0 && cost.min === '' && cost.max !== ''){
            if(Math.round(getPriceOnlyNum(data1[i].price, cur)) < cost.max){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                    location: data1[i].location,
                    duration: getDurationOnlyNum(durations[i])
                })
            }
        }else if(duration === 0 && cost.min !== '' && cost.max === ''){
            if(Math.round(getPriceOnlyNum(data1[i].price, cur)) > cost.min){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                    location: data1[i].location,
                    duration: getDurationOnlyNum(durations[i])
                })
            }
        }else if(duration !== 0 && cost.min !== '' && cost.max !== ''){
            if(getDurationOnlyNum(durations[i]) === duration){
                if(cost.min < Math.round(getPriceOnlyNum(data1[i].price, cur)) && cost.max > Math.round(getPriceOnlyNum(data1[i].price, cur.data))){
                    result.push({
                        date: data1[i].date,
                        title: data1[i].title,
                        link: URL1 + data1[i].link,
                        price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                        location: data1[i].location,
                        duration: getDurationOnlyNum(durations[i])
                    })
                }
            }
        }else if(duration !== 0 && cost.min !== '' && cost.max === ''){
            if(getDurationOnlyNum(durations[i]) === duration) {
                if (Math.round(getPriceOnlyNum(data1[i].price, cur)) > cost.min) {
                    result.push({
                        date: data1[i].date,
                        title: data1[i].title,
                        link: URL1 + data1[i].link,
                        price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                        location: data1[i].location,
                        duration: getDurationOnlyNum(durations[i])
                    })
                }
            }
        }else if(duration !== 0 && cost.min === '' && cost.max !== ''){
            if(getDurationOnlyNum(durations[i]) === duration){
                if(cost.max > Math.round(getPriceOnlyNum(data1[i].price, cur))){
                    result.push({
                        date: data1[i].date,
                        title: data1[i].title,
                        link: URL1 + data1[i].link,
                        price: Math.round(getPriceOnlyNum(data1[i].price, cur)),
                        location: data1[i].location,
                        duration: getDurationOnlyNum(durations[i])
                    })
                }
            }
        }
    }
    return result
}

let getPriceOnlyNum = (price, cur) => {

    let currency = ''
    let _price = ''

    if(price.match(/\$/g)) {
        currency = 'USD'
    }else if(price.match(/€/g)){
        currency = 'EUR'
    }else if(price.match(/руб/g)){
        currency = 'RUR'
    }

    for (let i = 0; i < price.length; i++){
        if(Number.isInteger(parseInt(price[i]))){
            _price += price[i]
        }
    }

    switch (currency) {
        case "USD":
            return _price * cur[0].sale
        case "EUR":
            return _price * cur[1].sale
        case "RUR":
            return _price * cur[2].sale
    }

    return _price
}

let getDurationOnlyNum = (duration) => {
    let _duration = ''
    for (let i = 0; i < duration.length; i++){
        if(Number.isInteger(parseInt(duration[i]))){
            _duration += duration[i]
        }else{
            return _duration
        }
    }
}
