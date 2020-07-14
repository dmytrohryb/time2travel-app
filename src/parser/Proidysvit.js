const cheerio = require('react-native-cheerio')
const axios = require('axios')
import React from "react";

export class Proidysvit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            link: '',
            price: '',
            location: '',
            duration: ''
        }
        this.handleChangeData = this.handleChangeData.bind(this)
    }

    handleChangeData(obj){
        this.props.onChangeData(obj)
    }

    componentDidMount(){
        const URL1 = 'https://proydisvit.com/'
        const SHEDULE_URL1 = 'shedule?filter[date]='

        let temp = []

        axios.get(URL1 + SHEDULE_URL1 + this.props.date)
            .then(res => {
                const $ = cheerio.load(res.data)
                $('tr.tr-row').each((i, elem) => {
                    if ($(elem).find('td.tr-date').text().substr(54, 5) + '.2020' === this.props.date) {
                        this.setState({
                            date: date,
                            title: $(elem).find('td.tr-name a').text(),
                            link: $(elem).find('td.tr-name a').attr('href'),
                            price: $(elem).find('td.tr-price').text().substr(58, 69).replace(/\s/g, ''),
                            location: $(elem).find('td.tr-location').text().substr(58, 40).replace(/\s/g, '')

                        })

                        axios.get(URL1 + this.state.link)
                            .then(res => {
                                const $ = cheerio.load(res.data)

                                let switcher = false
                                $('div.travel_params table tr.travel_item:nth-child(1) td').each((i, elem) => {
                                    if(switcher){
                                        this.setState({duration: $(elem).text()})
                                        this.handleChangeData({
                                            date: this.state.date,
                                            title: this.state.title,
                                            link: this.state.link,
                                            price: this.state.price,
                                            location: this.state.location,
                                            duration: this.state.duration
                                        })
                                        switcher = false
                                    }
                                    if($(elem).text().match(/валість/g)){
                                        switcher = true
                                    }
                                })
                            })
                            .catch(err => console.log(err))
                    }
                })
            })
            .catch(err => console.log(err))
    }
}


/*
export const Proidysvit = (function(){
    const URL1 = 'https://proydisvit.com/'
    const SHEDULE_URL1 = 'shedule?filter[date]='

    let data = []
    let temp = []

    return {
        parse: function(date){
            let getData = (html) => {
                const $ = cheerio.load(html)
                $('tr.tr-row').each((i, elem) => {
                    if($(elem).find('td.tr-date').text().substr(54, 5) + '.2020' === date){
                        temp.push({
                            date: date,
                            title: $(elem).find('td.tr-name a').text(),
                            link: $(elem).find('td.tr-name a').attr('href'),
                            price: $(elem).find('td.tr-price').text().substr(58, 69).replace(/\s/g, ''),
                            location: $(elem).find('td.tr-location').text().substr(58, 40).replace(/\s/g, '')
                        })
                    }
                })
            }

            axios.get(URL1 + SHEDULE_URL1 + date)
                .then(res => {
                    getData(res.data)
                })
                .catch(err => console.log(err))
        },
        getData: temp
    }
})();



*/
