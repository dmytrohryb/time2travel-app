import { Text, TouchableNativeFeedback, View} from "react-native";
import React, {useState, useEffect} from "react";
import {ListItem} from "react-native-elements";
import {styles} from "../styles/Styles";
import axios from 'axios';
import cheerio from 'react-native-cheerio';

export class MainScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            url: 'https://proydisvit.com/shedule?filter[date]=',
            list: [],
            adas: 245
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
                        price: $(elem).find('td.tr-price').text().substr(58, 69).replace(/\s/g, '')
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
        if(this.state.loaded){
            return(
                <View style={styles.container}>
                    <View>
                        {
                            this.state.list.map((l, i) => (

                                <ListItem
                                    key={i}
                                    title={l.title}
                                    subtitle={l.date}
                                    rightElement={l.price}
                                    bottomDivider
                                />

                            ))
                        }
                    </View>
                </View>
            );
        }else{
            return(<Text style={{marginTop: 250, marginLeft: 100}}>Loading...</Text>)
        }
    }
}
