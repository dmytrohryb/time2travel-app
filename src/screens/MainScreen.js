import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from "../styles/Styles";
import axios from 'axios';
import cheerio from 'react-native-cheerio';
import {Preview} from '../components/Preview';
import {Header, Icon} from "react-native-elements";

export class MainScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            url: 'https://proydisvit.com/shedule?filter[date]=',
            list: []
        }

        this.updateView = this.updateView.bind(this)
    }

    updateView(date){
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
                        location: $(elem).find('td.tr-location').text().substr(58, 40).replace(/\s/g, '')
                    })
                }
            })
            return data;
        }

        axios.get(this.state.url + date)
            .then(res => {
                let data = getData(res.data)
                this.setState({list: data, loaded: true})
            })
            .catch(err => console.log(err))
    }

    render() {
        const burgerButton = (
            (<TouchableOpacity>
                <Image source={'../../icons/navigate_next-24px.svg'} />
            </TouchableOpacity>)
        )

        if(this.state.loaded){
            return(
                <View>
                    <Header
                        leftComponent={burgerButton}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />

                <View style={{marginTop: 10}}>
                    <View>
                        {
                            this.state.list.map((l, i) => (
                                <Preview key={i} date={l.date} title={l.title} link={this.state.url.slice(0, 22) + l.link} price={l.price} location={l.location} />
                            ))
                        }
                    </View>
                </View>
                </View>
            );
        }else{
            return(
                <View>
                    <Header
                        leftComponent={}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />
                <Text style={{marginTop: 250, marginLeft: 100}}>Loading...</Text>
                </View>
            )
        }
    }
}






