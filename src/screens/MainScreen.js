import { Text, View, ScrollView, SafeAreaView} from "react-native";
import React from "react";
import {Preview} from '../components/Preview';
import {Header} from "react-native-elements";
import {Parser} from "../parser/Parser";
import {ListPreview} from "../components/ListPreview";

export class MainScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            list: []
        }

        this.updateView = this.updateView.bind(this)
    }

    updateView(date, duration, cost){
        this.setState({loaded: false, list: []})

        Parser(date, duration, cost)
            .then(res => {
                this.setState({list: res, loaded: true})
            })
    }

    render() {
        if(this.state.loaded){
            return(

                <ScrollView>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />

                    <ListPreview list={this.state.list} />
                </ScrollView>

            );
        }else{
            return(
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />
                <Text style={{marginTop: 250, marginLeft: 100}}>Loading...</Text>
                </View>
            )
        }
    }
}
