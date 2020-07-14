import React from "react";
import { Button, DrawerLayoutAndroid, Text, View } from "react-native";
import {styles} from "./src/styles/Styles";
import DatePicker from "react-native-datepicker"
import {CheckBox, Slider} from "react-native-elements";
import {MainScreen} from "./src/screens/MainScreen";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.currentDate(),
            countDays: 1,
            onlyUkraine: false,
        }

        this.MainScreen = React.createRef();
        this.currentDate = this.currentDate.bind(this)

    }

    componentDidMount() {
        this.MainScreen.current.updateView(this.state.date)
    }

    currentDate(){
        let currentDate = new Date()
        let num = currentDate.getMonth() + 1
        let currentMonth
        if(num.toString().length === 1){
            currentMonth = '0' + num
        }else{
            currentMonth = num
        }
        let res = (currentDate.getDate() + '.' + currentMonth + '.' + currentDate.getFullYear())
        return res
    }

    render() {
        const navigationView = (
            <View style={styles.navigationContainer}>
                <View style={{padding: 10, marginTop: 150, backgroundColor: '#0080ff'}}>
                    <Text style={{color: '#fff'}}>Дата начала: </Text>
                </View>
                <DatePicker
                    style={{width: 280, marginTop: 20}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
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
                    onDateChange={date => this.setState({date: date})}
                />
                <View style={{padding:10, marginTop: 20, marginBottom: 10, backgroundColor: '#0080ff'}}>
                    <Text style={{color: '#fff'}}>Продолжительность: </Text>
                </View>
                <Slider
                    minimumValue={1}
                    maximumValue={14}
                    step={1}
                    thumbTintColor='#0080ff'
                    value={this.state.countDays}
                    onValueChange={value => this.setState({countDays: value})}
                />
                <Text>Дней: {this.state.countDays}</Text>

                <View style={{marginTop: 20, marginBottom: 10}}>
                    <CheckBox
                        size={16}
                        title='Искать только по Украине'
                        checked={this.state.onlyUkraine}
                        onPress={() => this.setState({onlyUkraine: !this.state.onlyUkraine})}
                    />
                </View>

                <Button
                    title="Применить"
                    onPress={()=>{
                        this.MainScreen.current.updateView(this.state.date)
                    }}
                />
            </View>
        )
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={'left'}
                renderNavigationView={() => navigationView}
            >
                <MainScreen ref={this.MainScreen} date={this.state.date} />
            </DrawerLayoutAndroid>
        );
    }
};

export default App;


