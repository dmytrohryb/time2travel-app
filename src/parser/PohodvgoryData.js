const axios = require('axios')
const cheerio = require('react-native-cheerio')

const URL = 'https://pohod-v-gory.com'
const SHEDULE_URL = '/tours/расписание-походов/'

export const getDataPohodvgory = async (date, duration, cost, curs) => {

    const tempData = []
    const response = await axios.get(URL + SHEDULE_URL)
    const $ = cheerio.load(response.data)

    $('div.date-pohods-wrapper div.date_pohods div.schd-box').each((i, elem) => {
        if($(elem).find('div.schd-tbl div.start-date').text().substr(1, 10) === date){
            if(duration === 0 && cost.max === '' && cost.min === ''){
                tempData.push({
                    date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                    title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                    link: $(elem).find('div.schd-name a').attr('href'),
                    price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                    location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                    duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                })
            }else if(duration === 0 && cost.max !== '' && cost.min === ''){
                if(Math.round(getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs)) < cost.max){
                    tempData.push({
                        date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                        title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                        link: $(elem).find('div.schd-name a').attr('href'),
                        price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                        location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                        duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                    })
                }
            }else if(duration === 0 && cost.max === '' && cost.min !== ''){
                if(getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs) > cost.min){
                    tempData.push({
                        date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                        title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                        link: $(elem).find('div.schd-name a').attr('href'),
                        price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                        location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                        duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                    })
                }
            }else if(duration === 0 && cost.max !== '' && cost.min !== ''){
                if(getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs) > cost.min && getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs) < cost.max){
                    tempData.push({
                        date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                        title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                        link: $(elem).find('div.schd-name a').attr('href'),
                        price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                        location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                        duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                    })
                }
            }else if(duration !== 0 && cost.max === '' && cost.min === ''){
                if(duration === parseInt(getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, '')))){
                    tempData.push({
                        date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                        title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                        link: $(elem).find('div.schd-name a').attr('href'),
                        price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                        location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                        duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                    })
                }
            }else if(duration !== 0 && cost.max !== '' && cost.min === ''){
                if(duration === parseInt(getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))) && getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs) < cost.max){
                    tempData.push({
                        date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                        title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                        link: $(elem).find('div.schd-name a').attr('href'),
                        price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                        location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                        duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                    })
                }
            }else if(duration !== 0 && cost.max === '' && cost.min !== ''){
                if(duration === parseInt(getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))) && getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs) > cost.min){
                    tempData.push({
                        date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                        title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                        link: $(elem).find('div.schd-name a').attr('href'),
                        price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                        location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                        duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                    })
                }
            }else if(duration !== 0 && cost.max !== '' && cost.min !== ''){
                if(duration === parseInt(getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))) && getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs) > cost.min && getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs) < cost.max){
                    tempData.push({
                        date: $(elem).find('div.schd-tbl div.start-date').text().substr(1, 10),
                        title: $(elem).find('div.schd-name a').text().replace(/\r?\n/g, ""),
                        link: $(elem).find('div.schd-name a').attr('href'),
                        price: getPriceOnlyNum($(elem).find('div.schd-price').text().replace(/\s/g, ''), curs),
                        location: $(elem).find('div.schd-place').text().replace(/\s/g, ''),
                        duration: getDurationOnlyNum($(elem).find('div.schd-loc').text().replace(/\s/g, ''))
                    })
                }
            }
        }
    })

    return tempData
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
        }else{
            break
        }
    }

    switch (currency) {
        case "USD":
            return Math.round(_price * cur[0].sale)
        case "EUR":
            return Math.round(_price * cur[1].sale)
        case "RUR":
            return Math.round(_price * cur[2].sale)
    }

    return parseInt(_price)
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

/*
if(date !== ''){

    }else{

    }
    tempData.push({
            date: date,
            title: $(elem).find('td.tr-name a').text(),
            link: $(elem).find('td.tr-name a').attr('href'),
            price: $(elem).find('td.tr-price').text().substr(58, 69).replace(/\s/g, ''),
            location: $(elem).find('td.tr-location').text().substr(58, 40).replace(/\s/g, ''),
            duration:
        })
 */
