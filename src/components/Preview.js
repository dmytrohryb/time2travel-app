import React from 'react';
import {View, Text} from "react-native";


export class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dayText = ''
        if(this.props.duration === 1){
            dayText = 'день'
        }else if(this.props.duration > 1 && this.props.duration < 5){
            dayText = 'дня'
        }else{
            dayText = 'дней'
        }
        let view = <><View style={{marginLeft: 5, marginRight: 5, borderBottomWidth: 1, borderColor: 'lightblue', borderRadius: 10, padding: 5}}>
            <View style={{flexDirection: "column"}}>
                <View><Text style={{marginBottom: 5, fontWeight: "bold", color: "grey" ,fontSize: 16}}>{this.props.title}</Text></View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{color: 'grey', fontWeight: "bold"}}>организатор: </Text>
                    <Text>{this.props.site}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>

                    <View style={{flexDirection: "row"}}>
                        <Text style={{color: 'grey', fontWeight: "bold"}}>регион: </Text>
                        <Text>{this.props.location}</Text>
                    </View>
                    <Text style={{fontWeight: "bold", color: "grey"}}>{this.props.price} грн</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{color: 'grey', fontWeight: "bold"}}>дата начала: </Text>
                    <Text>{this.props.date}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{color: 'grey', fontWeight: "bold"}}>продолжительность: </Text>
                    <Text>{this.props.duration} {dayText}</Text>
                </View>
            </View>
        </View></>;
        return view
    }
}
