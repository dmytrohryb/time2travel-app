import React from "react";
import { Button, DrawerLayoutAndroid, Text, View, TextInput } from "react-native";
import {styles} from "./src/styles/Styles";
import DatePicker from "react-native-datepicker"
import {CheckBox, Slider} from "react-native-elements";
import {MainScreen} from "./src/screens/MainScreen";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.currentDate(),
            duration: 0,
            min: '',
            max: ''
        }

        this.MainScreen = React.createRef();
        this.currentDate = this.currentDate.bind(this)
        this.onChangeText1 = this.onChangeText1.bind(this)
        this.onChangeText2 = this.onChangeText2.bind(this)

    }

    componentDidMount() {
        this.MainScreen.current.updateView(this.state.date, this.state.duration)
    }

    onChangeText1(text){
        this.setState({min: text})
    }

    onChangeText2(text){
        this.setState({max: text})
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
            <View style={{
                flex: 1,
                paddingTop: 35,
                backgroundColor: "#fff",
                padding: 8,
                justifyContent: "space-between"
            }}>
                <View>
                <View style={{padding: 10, backgroundColor: '#0080ff'}}>
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
                    minimumValue={0}
                    maximumValue={21}
                    step={1}
                    thumbTintColor='#0080ff'
                    value={this.state.duration}
                    onValueChange={value => this.setState({duration: value})}
                />
                <Text>Дней: {this.state.duration}</Text>

                <View style={{padding:10, marginTop: 20, marginBottom: 10, backgroundColor: '#0080ff'}}>
                    <Text style={{color: '#fff'}}>Цена: </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{marginLeft: 10, marginTop: 8}}>от</Text>
                <TextInput
                    style={{textAlign: "center", marginLeft:10, height: 40, width: 60, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText1(text)}
                    value={40}
                />
                    <Text style={{marginLeft: 10, marginTop: 8}}>грн</Text>

                <Text style={{marginLeft: 35, marginTop: 8}}>до</Text>
                <TextInput
                    style={{textAlign: "center", marginLeft: 10, height: 40, width: 60, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText2(text)}
                    value={40}
                    textA
                />
                <Text style={{marginLeft: 10, marginTop: 8}}>грн</Text>
                </View>

                <View style={{marginTop: 10}}>
                <Button
                    title="Применить"
                    onPress={()=>{
                        this.MainScreen.current.updateView(this.state.date, this.state.duration, {min: this.state.min, max: this.state.max})
                    }}
                />
                </View>
                </View>
                <Button
                    title="Отключить рекламу"
                    onPress={()=>{
                        this.MainScreen.current.updateView(this.state.date, this.state.duration, {min: this.state.min, max: this.state.max})
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


