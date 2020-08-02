import {Text, View} from "react-native";
import {Preview} from "./Preview";
import React from "react";

export class ListPreview extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentScreen: 1,
            list: [],
            countScreens: Math.ceil(this.props.list.length / 15)
        }
        this.props.stateUp(this.state.currentScreen, this.state.countScreens)
        this.setScreen = this.setScreen.bind(this)
    }

    componentDidMount(){
        let n = 15
        let tempData = []

        for (let i = 0; i < n; i++) {
            if(this.props.list[i]){
                tempData.push(this.props.list[i])
            }else{
                break
            }
        }
        this.setState({list: tempData, countScreens: Math.ceil(this.props.list.length / 15)})
        this.props.stateUp(this.state.currentScreen, this.state.countScreens)
    }

    setScreen(screenNumber) {
        let n = 15
        let tempData = []
        let iterator = 0
        if (n * screenNumber === n)
            iterator = 0
        else
            iterator = -15 + n * screenNumber

        for (iterator; iterator < (n * screenNumber); iterator++) {
            if (this.props.list[iterator]) {
                tempData.push(this.props.list[iterator])
            } else {
                break
            }
        }

        if (screenNumber > this.state.currentScreen) {
            this.setState({list: tempData, currentScreen: this.state.currentScreen + 1, countScreens: Math.ceil(this.props.list.length / 15)})
            this.props.stateUp(this.state.currentScreen + 1, this.state.countScreens)
        }else if(screenNumber === this.state.currentScreen){
            this.setState({list: tempData, currentScreen: this.state.currentScreen, countScreens: Math.ceil(this.props.list.length / 15)})
            this.props.stateUp(this.state.currentScreen, this.state.countScreens)
        }else{
            this.setState({list: tempData, currentScreen: this.state.currentScreen - 1, countScreens: Math.ceil(this.props.list.length / 15)})
            this.props.stateUp(this.state.currentScreen - 1, this.state.countScreens)
        }

    }

    render() {

        if (this.state.list.length !== 0){
            return(
                <View>
                    <View>

                        {
                            this.state.list.map((l, i) => (
                                <Preview
                                    key={i}
                                    title={l.title}
                                    site={l.site}
                                    date={l.date}
                                    link={l.link}
                                    location={l.location}
                                    price={l.price}
                                    duration={l.duration}
                                />
                            ))
                        }
                    </View>
                </View>
            )
        }else{
            return(<View><Text>Not data</Text></View>)
        }
    }
}
