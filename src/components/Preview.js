import React from 'react'
import {Linking, Text, TouchableNativeFeedback, View} from 'react-native';
import style from '../configs/style-config';
import languages from '../configs/lang-config';

export class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rippleColor: this.hexColor(),
            rippleOverflow: false
        }
        this.hexColor = this.hexColor.bind(this)
    }

    componentWillUnmount(){
        this.setState({rippleColor: this.hexColor()})
    }

    hexColor() {
        return style.getStyle().pressAnim
    }

    render() {
        let dayText = ''
        if (this.props.duration === 1) {
            dayText = languages.getLanguage()[21]
        } else if (this.props.duration > 1 && this.props.duration < 5) {
            dayText = languages.getLanguage()[22]
        } else {
            dayText = languages.getLanguage()[23]
        }
        let view = <>
            <TouchableNativeFeedback
                onPress={() => {
                    this.setState({rippleColor: this.hexColor(), rippleOverflow: this.state.rippleOverflow})
                    Linking.openURL(this.props.link)
                }}
                background={TouchableNativeFeedback.Ripple(this.hexColor(), this.state.rippleOverflow)}
            >
                <View
                    style={{borderBottomWidth: 1, borderColor: style.getStyle().underLine, padding: 5}}>
                    <View style={{flexDirection: "column"}}>

                        <View><Text style={{
                            marginBottom: 5,
                            fontWeight: "bold",
                            color: style.getStyle().fontColor,
                            fontSize: 16
                        }}>{this.props.title}</Text></View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: style.getStyle().fontColor, fontWeight: "bold"}}>{languages.getLanguage()[15]} </Text>
                            <Text>{this.props.site}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>

                            <View style={{flexDirection: "row"}}>
                                <Text style={{color: style.getStyle().fontColor, fontWeight: "bold"}}>{languages.getLanguage()[16]} </Text>
                                <Text>{this.props.location}</Text>
                            </View>
                            <Text style={{fontWeight: "bold", color: "grey"}}>{this.props.price} {languages.getLanguage()[24]}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: style.getStyle().fontColor, fontWeight: "bold"}}>{languages.getLanguage()[0]} </Text>
                            <Text>{this.props.date}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: style.getStyle().fontColor, fontWeight: "bold"}}>{languages.getLanguage()[28] + ":"} </Text>
                            <Text>{this.props.duration} {dayText}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
            </>
        return view
    }
}
