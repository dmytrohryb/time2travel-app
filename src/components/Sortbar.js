import React from 'react';
import styles from '../configs/style-config'
import languages from '../configs/lang-config'
import {SortButton} from './SortButton'
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Sortbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFilter: false,
            durationFilter: false,
            priceFilter: false
        }

        this.dateSort = React.createRef()
        this.durationSort = React.createRef()
        this.priceSort = React.createRef()

        //this.handlerDateFilter = this.handlerDateFilter.bind(this)
        this.handlerDurationFilter = this.handlerDurationFilter.bind(this)
        this.handlerPriceFilter = this.handlerPriceFilter.bind(this)
    }
/*
    handlerDateFilter(mode){
        this.durationSort.current.reset()
        this.priceSort.current.reset()
        this.props.sortDate(mode)
        this.setState({
            dateFilter: true,
            durationFilter: false,
            priceFilter: false
        })
    }
*/
    handlerDurationFilter(mode){
        //this.dateSort.current.reset()
        this.priceSort.current.reset()
        this.props.sortDuration(mode)
        this.setState({
            dateFilter: false,
            durationFilter: true,
            priceFilter: false
        })
    }

    handlerPriceFilter(mode){
        this.durationSort.current.reset()
        //this.dateSort.current.reset()
        this.props.sortPrice(mode)
        this.setState({
            dateFilter: false,
            durationFilter: false,
            priceFilter: true
        })

    }

    render() {
        return <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: styles.getStyle().sortBar}}>

                <SortButton ref={this.durationSort} iconName='sort' textButton={languages.getLanguage()[28]} activeFilter={this.state.durationFilter} handlePress={this.handlerDurationFilter}/>
                <SortButton ref={this.priceSort} iconName='sort' textButton={languages.getLanguage()[4]} activeFilter={this.state.priceFilter} handlePress={this.handlerPriceFilter}/>
            </View>
        </>
    }
}
//<SortButton ref={this.dateSort} iconName='sort' textButton='Дата' activeFilter={this.state.dateFilter} handlePress={this.handlerDateFilter}/>
