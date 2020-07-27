import {Text, View, Button, ScrollView} from "react-native";
import React from "react";
import {Header} from "react-native-elements";
import axios from 'axios'
import {ListPreview} from "../components/ListPreview"
var shuffle = require('../components/KnuthShuffle').knuthShuffle
import SearchBar from 'react-native-search-bar';

export class MainScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            list: [],
            currentScreen: 1,
            countScreens: 1,
            list2: []
        }
        this.ListPreview = React.createRef()
        this.updateView = this.updateView.bind(this)
        this.getChildState = this.getChildState.bind(this)
        this.searchInList = this.searchInList.bind(this)
    }

    updateView(date, duration, cost){
        this.setState({loaded: false})

        axios.post('https://parser-for-time2travel.herokuapp.com/',{
            date, duration, cost
        })
            .then(res => {

                this.setState({loaded: true, list: shuffle(res.data)})

            })
            .catch(err => {
                console.error(err.message)
            })
    }

    getChildState(cur, count){

        this.setState({loaded: true, currentScreen: cur, countScreens: count})

    }

    searchInList(value){
        this.setState({loaded: false, list2: []})
        let temp = []
        let regExp = new RegExp(value)
        for(let i = 0; i < this.state.list.length; i++){
            if(this.state.list[i].title.match(regExp) || this.state.list[i].location.match(regExp)){
                temp.push(this.state.list[i])
            }
        }
        this.setState({loaded: true, list2: temp})
        this.ListPreview.current.update()
    }

    render() {
        let backBtn
        let nextBtn

        if(this.state.loaded){
            return(
                <View style={{flex: 1}}>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />
                    <SearchBar
                        ref="searchBar"
                        placeholder="Search"
                        onChangeText={(value) => {
                            this.searchInList(value)
                        }}
                    />
                        <Text style={{alignSelf:"center", fontWeight: "bold", color:"grey"}}>Всего найдено: {(this.state.list2.length === 0) ? this.state.list.length : this.state.list2.length}</Text>
                        <ScrollView style={{marginBottom: 35}}>
                            <ListPreview ref={this.ListPreview} stateUp={this.getChildState} list={(this.state.list2.length === 0) ? this.state.list : this.state.list2} />
                        </ScrollView>


                    {(this.state.currentScreen > 1) ? backBtn = false : backBtn = true}
                    {(this.state.currentScreen < this.state.countScreens) ? nextBtn = false : nextBtn = true}

                    <View style={{flexDirection: "row", position: 'absolute', bottom:0, alignSelf:"center"}}>

                        <Button title={'        <<        '} disabled={backBtn} onPress={() => {
                            this.ListPreview.current.setScreen(this.state.currentScreen - 1)
                        }}/>
                        <View style={{margin: 7}}>
                            <Text style={{fontWeight: "bold", color: 'grey'}}>{this.state.currentScreen} / {this.state.countScreens}</Text>
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
