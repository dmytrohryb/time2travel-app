import {Text, View, ActivityIndicator, Button, ScrollView, SafeAreaView} from "react-native";
import React from "react";
import {Header} from "react-native-elements";
import axios from 'axios'
import {ListPreview} from "../components/ListPreview";

export class MainScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            list: [],
            currentScreen: 1,
            countScreens: 1
        }
        this.ListPreview = React.createRef();
        this.updateView = this.updateView.bind(this)
        this.getChildState = this.getChildState.bind(this)
    }

    updateView(date, duration, cost){
        this.setState({loaded: false})

        axios.post('https://parser-for-time2travel.herokuapp.com/',{
            date, duration, cost
        })
            .then(res => {
                this.setState({loaded: true, list: res.data})
            })
            .catch(err => {
                console.error(err.message)
            })
    }

    getChildState(cur, count){

        this.setState({loaded: true, currentScreen: cur, countScreens: count})

    }

    render() {
        let backBtn
        let nextBtn

        if(this.state.loaded){
            return(
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />
                    <SafeAreaView style={{height: '85%'}}>
                        <ScrollView>
                            <ListPreview ref={this.ListPreview} stateUp={this.getChildState} list={this.state.list} />
                        </ScrollView>
                    </SafeAreaView>
                    {(this.state.currentScreen > 1) ? backBtn = false : backBtn = true}
                    {(this.state.currentScreen < this.state.countScreens) ? nextBtn = false : nextBtn = true}
                    <View style={{flexDirection: "row", marginLeft: '27.5%'}}>
                        <Button title={'        <<        '} disabled={backBtn} onPress={() => {
                            this.ListPreview.current.setScreen(this.state.currentScreen - 1)
                        }}/>
                        <View style={{margin: 7}}>
                            <Text>{this.state.currentScreen} / {this.state.countScreens}</Text>
                        </View>
                        <Button title={'        >>        '} disabled={nextBtn} onPress={() => {
                            this.ListPreview.current.setScreen(this.state.currentScreen + 1)
                        }}/>
                    </View>
                </View>
            );
        }else{
            return(
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />

                        <View style={{marginTop: 300 ,marginLeft: 180}}>
                            <Text>LOADING ...</Text>
                        </View>



                </View>
            )
        }
    }
}
