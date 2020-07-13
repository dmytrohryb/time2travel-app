import React from 'react';
import {View, Text} from "react-native";
import cheerio from "react-native-cheerio";
import axios from "axios";

export class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 'загрузка ...',
        }
    }

    componentDidMount() {
        console.log(this.props.link)
        let getData = (html) => {
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

        axios.get(this.props.link)
            .then(res => {
                let data = getData(res.data)
                this.setState({dration: data})
            })
            .catch(err => console.log(err))
    }


    render() {
        let view = <><View style={{margin: 5, borderColor: 'lightblue', borderRadius: 10, borderWidth: 1, padding: 5}}>
            <View style={{flexDirection: "column"}}>
                <View><Text style={{marginBottom: 5, fontSize: 16}}>{this.props.title}</Text></View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "row"}}>
                        <Text>регион: </Text>
                        <Text style={{color: 'grey', fontWeight: "bold"}}>{this.props.location}</Text>
                    </View>
                    <Text style={{fontWeight: "bold", color: "grey"}}>{this.props.price}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text>старт: </Text>
                    <Text style={{color: 'grey', fontWeight: "bold"}}>{this.props.date}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text>продолжительность: </Text>
                    <Text style={{color: 'grey', fontWeight: "bold"}}>{this.state.duration}</Text>
                </View>
            </View>
        </View></>;
        return view
    }
}
