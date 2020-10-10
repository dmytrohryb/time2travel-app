import React from 'react';
import styles from '../configs/style-config'
import languages from '../configs/lang-config'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, TouchableOpacity, View} from 'react-native';

const sort = <Icon name="sort" size={20} color={styles.getStyle().button} style={{margin: 10}}/>
const sortUp = <Icon name="sort-up" size={20} color={styles.getStyle().button} style={{margin: 10}}/>
const sortDown = <Icon name="sort-down" size={20} color={styles.getStyle().button} style={{margin: 10}}/>

export class Sortbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: styles.getStyle().sortBar}}>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Text style={{margin: 10, fontSize: 14}}>Дата</Text>
                        {sort}
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Text style={{margin: 10, fontSize: 14}}>Длительность</Text>
                        {sortDown}
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Text style={{margin: 10, fontSize: 14}}>Цена</Text>
                        {sortUp}
                    </TouchableOpacity>
                </View>
            </View>

        </>
    }
}
