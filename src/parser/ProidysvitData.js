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

export const getData = async (date, duration) => {

    const data1 = await getList(date)
    const durations = []
    const result = []

    for (let i = 0; i < data1.length; i++) {
        durations.push(await getDuration(data1[i].link))
    }

    for (let i = 0; i < data1.length; i++) {
        if(duration != 0){
            if(parseInt(durations[i].substr(0, 1)) == duration){
                result.push({
                    date: data1[i].date,
                    title: data1[i].title,
                    link: data1[i].link,
                    price: data1[i].price,
                    location: data1[i].location,
                    duration: durations[i].substr(0,1)
                })
            }
        }else{
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

    return result
}


