import cheerio from "react-native-cheerio";
import axios from "axios";

export const ProidysvitData = (date) => {
    const URL = 'https://proydisvit.com/'
    const SHEDULE_URL = 'shedule?filter[date]='
    let data = [];

    let getData2 = (html) => {
        let data = [];
        const $ = cheerio.load(html)
        let switcher = false
        $('div.travel_params table tr.travel_item:nth-child(1) td').each((i, elem) => {
            if(switcher){
                this.setState({duration: $(elem).text()})
                switcher = false
            }
            if($(elem).text().match(/валість/g)){
                switcher = true
            }
        })

        return data;
    }

    let getData = (html) => {
        let data = [];
        const $ = cheerio.load(html)
        $('tr.tr-row').each((i, elem) => {
            let temp1 = $(elem).find('td.tr-date').text().substr(54, 5) + '.2020'

            if(temp1 === date){
                data.push({
                    date: date,
                    title: $(elem).find('td.tr-name a').text(),
                    link: $(elem).find('td.tr-name a').attr('href'),
                    price: $(elem).find('td.tr-price').text().substr(58, 69).replace(/\s/g, ''),
                    location: $(elem).find('td.tr-location').text().substr(58, 40).replace(/\s/g, ''),
                    duration: axios.get(URL + $(elem).find('td.tr-name a').attr('href'))
                        .then(res => {
                            return getData2(res.data)
                        })
                        .catch(err => {return err})
                })
            }
        })
        return data;
    }

    axios.get(URL + SHEDULE_URL + date)
        .then(res => {
            data = getData(res.data)
            return data
        })
        .catch(err => console.log(err))



}
