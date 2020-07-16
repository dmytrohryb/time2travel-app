const axios = require('axios')
const cheerio = require('react-native-cheerio')

const URL1 = 'https://proydisvit.com'
const SHEDULE_URL1 = '/shedule?filter[date]='

const getList = async (date) => {

    const tempData = []

    const response = await axios.get(URL1 + SHEDULE_URL1 + date)

    const $ = cheerio.load(response.data)
    $('tr.tr-row').each((i, elem) => {
        if ($(elem).find('td.tr-date').text().substr(54, 5) + '.2020' === date) {
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

export const getData = async (date, duration, cost) => {

    const data1 = await getList(date)
    const durations = []
    const result = []

    for (let i = 0; i < data1.length; i++) {
        durations.push(await getDuration(data1[i].link))
    }

    for (let i = 0; i < data1.length; i++){

        if(duration !== 0 && cost.min === '' && cost.max === ''){
            if(parseInt(durations[i].substr(0, 1)) === duration){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: data1[i].price,
                    location: data1[i].location,
                    duration: durations[i].substr(0,1)
                })
            }
        }else if(duration === 0 && cost.min === '' && cost.max === ''){
            result.push({
                date: data1[i].date,
                title: data1[i].title,
                link: URL1 + data1[i].link,
                price: data1[i].price,
                location: data1[i].location,
                duration: durations[i].substr(0,1)
            })
        }else if(duration === 0 && cost.min !== '' && cost.max !== ''){
            if(parseInt(data1[i].price) > cost.min && parseInt(data1[i].price) < cost.max){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: data1[i].price,
                    location: data1[i].location,
                    duration: durations[i].substr(0,1)
                })
            }
        }else if(duration === 0 && cost.min === '' && cost.max !== ''){
            if(parseInt(data1[i].price) < cost.max){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: data1[i].price,
                    location: data1[i].location,
                    duration: durations[i].substr(0,1)
                })
            }
        }else if(duration === 0 && cost.min !== '' && cost.max === ''){
            if(parseInt(data1[i].price) > cost.min){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: URL1 + data1[i].link,
                    price: data1[i].price,
                    location: data1[i].location,
                    duration: durations[i].substr(0,1)
                })
            }
        }else if(duration !== 0 && cost.min !== '' && cost.max !== ''){
            if(parseInt(durations[i].substr(0, 1)) === duration){
                if(cost.min < data1[i].price && cost.max > data1[i].price){
                    result.push({
                        date: data1[i].date,
                        title: data1[i].title,
                        link: URL1 + data1[i].link,
                        price: data1[i].price,
                        location: data1[i].location,
                        duration: durations[i].substr(0,1)
                    })
                }
            }
        }else if(duration !== 0 && cost.min !== '' && cost.max === ''){
            if(parseInt(durations[i].substr(0, 1)) === duration) {
                if (parseInt(data1[i].price) > cost.min) {
                    result.push({
                        date: data1[i].date,
                        title: data1[i].title,
                        link: URL1 + data1[i].link,
                        price: data1[i].price,
                        location: data1[i].location,
                        duration: durations[i].substr(0, 1)
                    })
                }
            }
        }else if(duration !== 0 && cost.min === '' && cost.max !== ''){
            if(parseInt(durations[i].substr(0, 1)) === duration){
                if(cost.max > data1[i].price){
                    result.push({
                        date: data1[i].date,
                        title: data1[i].title,
                        link: URL1 + data1[i].link,
                        price: data1[i].price,
                        location: data1[i].location,
                        duration: durations[i].substr(0, 1)
                    })
                }
            }
        }
    }
    return result
}


let getPriceOnlyNum = (price) => {
    let _price
    for (let i = 0; i < price.length; i++){
        if(parseInt(price[i])){
            _price += price[i]
        }
    }
    return _price
}


/*
for (let i = 0; i < data1.length; i++) {
        console.log(parseInt(durations[i].substr(0, 1)))

        if(duration != 0 && cost === {}){
            if(parseInt(durations[i].substr(0, 1)) == duration){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: data1[i].link,
                    price: data1[i].price,
                    location: data1[i].location,
                    duration: durations[i].substr(0,1)
                })
                console.log(true)
            }
        }else if(duration == 0 && cost == {}){
            result.push({
                date: data1[i].date,
                title: data1[i].title,
                link: data1[i].link,
                price: data1[i].price,
                location: data1[i].location,
                duration: durations[i].substr(0,1)
            })
        }else if(duration != 0 && cost != {}){
            if(parseInt(durations[i].substr(0, 1)) == duration){
                let price = getPriceOnlyNum(data1[i].price)
                if(price <= cost.max && price >= cost.min){
                    result.push({
                        date: data1[i].date,
                        title: data1[i].title,
                        link: data1[i].link,
                        price: data1[i].price,
                        location: data1[i].location,
                        duration: durations[i].substr(0,1)
                    })
                }
            }
        }else if(duration == 0 && cost != {}){
            let price = getPriceOnlyNum(data1[i].price)
            if(price <= cost.max && price >= cost.min){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: data1[i].link,
                    price: data1[i].price,
                    location: data1[i].location,
                    duration: durations[i].substr(0,1)
                })
            }
        }
    }
 */
