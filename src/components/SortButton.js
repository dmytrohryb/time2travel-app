import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import styles from '../configs/style-config'
import languages from '../configs/lang-config'

export class SortButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: 'sort'
        }
        this.handlePress = this.handlePress.bind(this)
        this.reset = this.reset.bind(this)
    }

    handlePress(){

        if(this.state.icon === 'sort'){

            this.setState({icon: 'sort-up'})
            this.props.handlePress('up')
        }else if(this.state.icon === 'sort-up'){

            this.setState({icon: 'sort-down'})
            this.props.handlePress('down')
        }else if(this.state.icon === 'sort-down'){

            this.setState({icon: 'sort'})
            this.props.handlePress('default')
        }
    }

    reset(){
        this.setState({icon: 'sort'})
    }

    render(){
        return <>
            <View style={{backgroundColor: (this.props.activeFilter) ? "#fff" : styles.getStyle().sortBar, flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width / 2}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.handlePress}>
                    <Text style={{marginRight: 10, marginVertical: 10, fontSize: 14}}>{this.props.textButton}</Text>
                    <Icon name={this.state.icon} size={20} color={styles.getStyle().button} style={{marginVertical: 10}}/>
                </TouchableOpacity>
            </View>
            </>
    }
}
