import { Text, View} from "react-native";
import React from "react";
import {Preview} from '../components/Preview';
import {Header} from "react-native-elements";
import {getData} from '../parser/ProidysvitData';

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

        getData(date, duration, cost)
            .then(res => {
                this.setState({list: res, loaded: true})
            })
            .catch(err => console.error(err))
    }

    render() {
        if(this.state.loaded){
            return(
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    />

                <View style={{marginTop: 10}}>
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
                </View>
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
