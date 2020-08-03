import React from "react";
import { Button, DrawerLayoutAndroid, Text, View, TextInput } from "react-native";
import DatePicker from "react-native-datepicker"
import {Slider} from "react-native-elements";
import {MainScreen} from "./src/screens/MainScreen";
import language from "./src/configs/lang-config";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            duration: 0,
            min: '',
            max: ''
        }

        this.MainScreen = React.createRef()
        this.currentDate = this.currentDate.bind(this)
        this.onChangeText1 = this.onChangeText1.bind(this)
        this.onChangeText2 = this.onChangeText2.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
    }

    componentDidMount() {
        this.MainScreen.current.updateView(this.state.date, this.state.duration, {min: this.state.min, max: this.state.max})
        language.setLanguage().then(res => {
            this.changeLanguage()
        })
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

    changeLanguage(data){
        this.forceUpdate()
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
                    <Text style={{color: '#fff'}}>{language.getLanguage()[0]}</Text>
                </View>
                <DatePicker
                    style={{width: 280, marginTop: 20}}
                    date={this.state.date}
                    mode="date"
                    placeholder={language.getLanguage()[1]}
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
                    <Text style={{color: '#fff'}}>{language.getLanguage()[2]}</Text>
                </View>
                <Slider
                    minimumValue={0}
                    maximumValue={21}
                    step={1}
                    thumbTintColor='#0080ff'
                    value={this.state.duration}
                    onValueChange={value => this.setState({duration: value})}
                />
                <Text>{language.getLanguage()[3] + this.state.duration}</Text>

                <View style={{padding:10, marginTop: 20, marginBottom: 10, backgroundColor: '#0080ff'}}>
                    <Text style={{color: '#fff'}}>{language.getLanguage()[4]}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{marginLeft: 10, marginTop: 8}}>{language.getLanguage()[5]}</Text>
                <TextInput
                    style={{textAlign: "center", marginLeft:10, height: 40, width: 60, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText1(text)}
                    value={this.state.min}
                />
                    <Text style={{marginLeft: 10, marginTop: 8}}>грн</Text>

                <Text style={{marginLeft: 35, marginTop: 8}}>{language.getLanguage()[6]}</Text>
                <TextInput
                    style={{textAlign: "center", marginLeft: 10, height: 40, width: 60, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText2(text)}
                    value={this.state.max}
                />
                <Text style={{marginLeft: 10, marginTop: 8}}>грн</Text>
                </View>

                <View style={{marginTop: 10}}>
                <Button
                    title={language.getLanguage()[7]}
                    onPress={()=>{
                        this.refs['Drawer'].closeDrawer()
                        this.MainScreen.current.updateView(this.state.date, this.state.duration, {min: this.state.min, max: this.state.max})

                    }}
                />
                </View>
                    <View style={{marginTop: 10}}>
                        <Button
                            title={language.getLanguage()[8]}
                            onPress={()=>{
                                this.setState({date: '', duration: 0, min: '', max: ''})
                            }}
                        />
                    </View>

                </View>
                <View>
                    <Button
                        title="About me"
                        onPress={()=>{

                        }}
                    />
                </View>

            </View>
        )

        return (

            <DrawerLayoutAndroid
                ref={'Drawer'}
                drawerWidth={300}
                drawerPosition={'left'}
                renderNavigationView={() => navigationView}
            >
                <MainScreen ref={this.MainScreen} openDrawer={() => this.refs['Drawer'].openDrawer()} changeLanguage={this.changeLanguage} />
            </DrawerLayoutAndroid>
        );
    }
};

export default App;
