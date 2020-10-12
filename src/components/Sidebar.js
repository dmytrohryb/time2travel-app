import React from 'react';
import styles from '../configs/style-config'
import languages from '../configs/lang-config'
import {Text, View, TextInput, Button} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DatePicker from 'react-native-datepicker'
import {Warning} from './Warning';
const { DateTime } = require("luxon")

const convertDate = (date) => {
    return date[6] + date[7] + date[8] + date[9] + '-' + date[3] + date[4] + '-' + date[0] + date[1]
}

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            finishDate: '',
            minPrice: '',
            maxPrice: ''
        }

        this.Warning = React.createRef()
        this.handlerApplyButton = this.handlerApplyButton.bind(this)
        this.changeMinPrice = this.changeMinPrice.bind(this)
        this.changeMaxPrice = this.changeMaxPrice.bind(this)
        this.handlerResetButton = this.handlerResetButton.bind(this)
    }

    changeMinPrice(price, mode){
        if(mode === 'manual'){
            this.setState({minPrice: price})
        }else{
            if(mode === 'minus'){
                if(this.state.minPrice.length === 0){
                    this.setState({minPrice: ''})
                }else{
                    this.setState({minPrice: (parseInt(this.state.minPrice, 10) - parseInt(price, 10) > 0) ? (parseInt(this.state.minPrice, 10) - parseInt(price, 10)).toString(10) : ''})
                }
            }
            if(mode === 'plus'){
                if(this.state.minPrice.length === 0){
                    this.setState({minPrice: (0 + parseInt(price, 10)).toString(10)})
                }else{
                    this.setState({minPrice: (parseInt(this.state.minPrice, 10) + parseInt(price, 10)).toString(10) })
                }
            }
        }
    }

    changeMaxPrice(price, mode){
        if(mode === 'manual'){
            this.setState({maxPrice: price})
        }else{
            if(mode === 'minus'){
                if(this.state.maxPrice.length === 0){
                    this.setState({maxPrice: ''})
                }else{
                    this.setState({maxPrice: (parseInt(this.state.maxPrice, 10) - parseInt(price, 10) > 0) ? (parseInt(this.state.maxPrice, 10) - parseInt(price, 10)).toString(10) : ''})
                }
            }
            if(mode === 'plus'){
                if(this.state.maxPrice.length === 0){
                    this.setState({maxPrice: (0 + parseInt(price, 10)).toString(10)})
                }else{
                    this.setState({maxPrice: (parseInt(this.state.maxPrice, 10) + parseInt(price, 10)).toString(10) })
                }
            }
        }
    }

    firstMoreThanTheSecond(d1, d2){
        let date1 = DateTime.fromISO(d1)
        let date2 = DateTime.fromISO(d2)
        return (date1 > date2) ? true : false
    }

    handlerApplyButton(){
        let minP = (this.state.minPrice.length === 0) ? 0 : parseInt(this.state.minPrice)
        let maxP = (this.state.maxPrice.length === 0) ? 9999999 : parseInt(this.state.maxPrice)

        if(minP > maxP){
            this.Warning.current.showWarning(languages.getLanguage()[26])
            return false
        }

        if(this.firstMoreThanTheSecond(convertDate(this.state.startDate), convertDate(this.state.finishDate))){
            this.Warning.current.showWarning(languages.getLanguage()[27])
            return false
        }

        this.props.updateView(this.state)
        return true
    }

    handlerResetButton(){
        this.setState({
            startDate: '',
            finishDate: '',
            minPrice: '',
            maxPrice: ''
        })
    }

    render() {
        return <>
            <View style={{
                flex: 1,
                paddingTop: 35,
                backgroundColor: styles.getStyle().backgroundSidebar,
                padding: 8,
                justifyContent: "space-between"
            }}>
                <Warning ref={this.Warning} />
                <View>
                    <View style={{padding: 10, backgroundColor: styles.getStyle().label}}>
                        <Text style={{color: styles.getStyle().fontColor2}}>{languages.getLanguage()[0]}</Text>
                    </View>

                    <DatePicker
                        style={{width: 280, marginTop: 10}}
                        date={this.state.startDate}
                        mode="date"
                        placeholder={languages.getLanguage()[1]}
                        format="DD.MM.YYYY"
                        minDate="01-05-2020"
                        maxDate="01-05-2040"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={date => this.setState({startDate: date})}
                    />

                    <View style={{padding:10, marginTop: 10, marginBottom: 10, backgroundColor: styles.getStyle().label}}>
                        <Text style={{color: styles.getStyle().fontColor2}}>{languages.getLanguage()[2]}</Text>
                    </View>

                    <DatePicker
                        style={{width: 280, marginTop: 10}}
                        date={this.state.finishDate}
                        mode="date"
                        placeholder={languages.getLanguage()[1]}
                        format="DD.MM.YYYY"
                        minDate="01-05-2020"
                        maxDate="01-05-2040"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => this.setState({finishDate: date})}
                    />

                    <View style={{padding: 10, marginTop: 10, marginBottom: 10, backgroundColor: styles.getStyle().label}}>
                        <Text style={{color: styles.getStyle().fontColor2}}>{languages.getLanguage()[4] + " " + languages.getLanguage()[24] + ":"}</Text>
                    </View>

                    <View style={{flexDirection: "row", marginLeft: 10}}>

                        <Text style={{color: styles.getStyle().fontColor, marginTop: 9, width: 30}}>{languages.getLanguage()[5]}</Text>
                        <View style={{flexDirection: "row", marginLeft: 10}}>
                            <IconButton
                                icon={() => {return <Icon name="minus" size={30} color={styles.getStyle().button} />}}
                                size={20}
                                onPress={() => this.changeMinPrice('250', 'minus')}
                            />
                            <TextInput
                                style={{textAlign: "center", height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={data => this.changeMinPrice(data, 'manual')}
                                value={this.state.minPrice}
                            />
                            <IconButton
                                icon={() => {return <Icon name="plus" size={30} color={styles.getStyle().button} />}}
                                size={20}
                                onPress={() => this.changeMinPrice('250', 'plus')}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection: "row", marginLeft: 10, marginTop: 10}}>
                        <Text style={{color: styles.getStyle().fontColor, marginTop: 9, width: 30}}>{languages.getLanguage()[6]}</Text>

                            <View style={{flexDirection: "row", marginLeft: 10}}>
                                <IconButton
                                    icon={() => {return <Icon name="minus" size={30} color={styles.getStyle().button} />}}
                                    size={20}
                                    onPress={() => this.changeMaxPrice('250', 'minus')}
                                />
                            <TextInput
                                style={{textAlign: "center", height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={data => this.changeMaxPrice(data, 'manual')}
                                value={this.state.maxPrice}
                            />

                            <IconButton
                                icon={() => {return <Icon name="plus" size={30} color={styles.getStyle().button} />}}
                                size={20}
                                onPress={() => this.changeMaxPrice('250', 'plus')}
                            />

                            </View>


                    </View>


                    <View style={{marginTop: 10}}>
                        <Button
                            color={styles.getStyle().button}
                            title={languages.getLanguage()[7]}
                            onPress={()=>{
                                if(this.handlerApplyButton()){
                                    this.props.closeSidebar()
                                }
                            }}
                        />
                    </View>
                    <View style={{marginTop: 10}}>
                        <Button
                            color={styles.getStyle().button}
                            title={languages.getLanguage()[8]}
                            onPress={()=>{
                               this.handlerResetButton()
                            }}
                        />
                    </View>


                </View>
                <View>
                    <Button
                        color={styles.getStyle().button}
                        title={languages.getLanguage()[17]}
                        onPress={()=>{

                        }}
                    />
                </View>

            </View>
        </>
    }
}
