import {Text, View} from "react-native";
import {Preview} from "./Preview";
import React from "react";

export class ListPreview extends React.Component{
    constructor(props) {
        super(props);
        let n = 15
        let tempData = []

        for (let i = 0; i < n; i++) {
            if(this.props.list[i]){
                tempData.push(this.props.list[i])
            }else{
                break
            }
        }

        this.state = {
            currentScreen: 1,
            list: tempData,
            countScreens: Math.ceil(this.props.list.length / n)
        }
        this.props.stateUp(this.state.currentScreen, this.state.countScreens)
        this.setScreen = this.setScreen.bind(this)
    }

    setScreen(screenNumber){
        let n = 15
        let tempData = []
        let iterator = 0

        if (n * screenNumber === n)
            iterator = 0
        else
            iterator = -15 + n * screenNumber

        for(iterator; iterator < (n * screenNumber); iterator++){
            if(this.props.list[iterator]){
                tempData.push(this.props.list[iterator])
            }else{
                break
            }
        }

        if(screenNumber > this.state.currentScreen){
            this.setState({list: tempData, currentScreen: this.state.currentScreen + 1 })
            this.props.stateUp(this.state.currentScreen + 1, this.state.countScreens)
        }else{
            this.setState({list: tempData, currentScreen: this.state.currentScreen - 1 })
            this.props.stateUp(this.state.currentScreen - 1, this.state.countScreens)
        }

    }

    render() {
        if (typeof this.state.list === typeof []){
            return(
                <View>
                    <View>
                        {
                            this.state.list.map((l, i) => (
                                <Preview
                                    key={i}
                                    title={l.title}
                                    date={l.date}
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
/*
{(this.state.currentScreen > 1) ? backBtn = false : backBtn = true}
{(this.state.currentScreen < this.state.countScreens) ? nextBtn = false : nextBtn = true}
<View style={{flexDirection: "row", marginLeft: 160}}>
    <Button title={'  <<  '} disabled={backBtn}  onPress={() => {
        this.setScreen(this.state.currentScreen - 1)
    }}/>
    <View style={{margin: 5}}></View>
    <Button title={'  >>  '} disabled={nextBtn} onPress={() => {
        this.setScreen(this.state.currentScreen + 1)
    }}/>
</View>

 */
