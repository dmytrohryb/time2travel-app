import React from 'react';
import {View, Text, TouchableNativeFeedback, Linking} from "react-native";
import languages from '../configs/lang-config'

export class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rippleColor: this.randomHexColor(),
            rippleOverflow: false
        }
        this.randomHexColor = this.randomHexColor.bind(this)
    }

    randomHexColor() {
        return "#2196F3"
        /*return "#000000".replace(/0/g, function () {
            return (~~(Math.random() * 16)).toString(16);
        });*/
    }

    render() {
        let dayText = ''
        if (this.props.duration === 1) {
            dayText = 'день'
        } else if (this.props.duration > 1 && this.props.duration < 5) {
            dayText = 'дня'
        } else {
            dayText = 'дней'
        }
        let view = <>
            <TouchableNativeFeedback
                onPress={() => {
                    this.setState({rippleColor: this.randomHexColor(), rippleOverflow: this.state.rippleOverflow})
                    Linking.openURL(this.props.link)
                }}
                background={TouchableNativeFeedback.Ripple(this.state.rippleColor, this.state.rippleOverflow)}
            >
                <View
                    style={{marginLeft: 5, marginRight: 5, borderBottomWidth: 1, borderColor: 'lightblue', padding: 5}}>
                    <View style={{flexDirection: "column"}}>

                        <View><Text style={{
                            marginBottom: 5,
                            fontWeight: "bold",
                            color: "grey",
                            fontSize: 16
                        }}>{this.props.title}</Text></View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: 'grey', fontWeight: "bold"}}>{languages.getLanguage()[15]} </Text>
                            <Text>{this.props.site}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>

                            <View style={{flexDirection: "row"}}>
                                <Text style={{color: 'grey', fontWeight: "bold"}}>{languages.getLanguage()[16]} </Text>
                                <Text>{this.props.location}</Text>
                            </View>
                            <Text style={{fontWeight: "bold", color: "grey"}}>{this.props.price} грн</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: 'grey', fontWeight: "bold"}}>{languages.getLanguage()[0]} </Text>
                            <Text>{this.props.date}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: 'grey', fontWeight: "bold"}}>{languages.getLanguage()[2]} </Text>
                            <Text>{this.props.duration} {dayText}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>


        </>;
        return view
    }
}
