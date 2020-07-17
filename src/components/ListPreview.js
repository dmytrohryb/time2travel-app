import {SafeAreaView, ScrollView, View} from "react-native";
import {Preview} from "./Preview";
import React from "react";

export class ListPreview extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(

                <View style={{marginTop: 10}}>
                    <View>
                        {
                            this.props.list.map((l, i) => (
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
    }
}
