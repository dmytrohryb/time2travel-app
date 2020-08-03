import {
    Text,
    View,
    Button,
    ScrollView,
    Modal,
    TouchableHighlight,
    StyleSheet,
    Image,
    Switch,
    TouchableOpacity
} from "react-native"
import React from "react"
import {Header} from "react-native-elements"
import axios from 'axios'
import {ListPreview} from "../components/ListPreview"
const shuffle = require('../components/KnuthShuffle').knuthShuffle
import {IconButton, ActivityIndicator, Colors} from "react-native-paper"
import languages from "../configs/lang-config"
import AsyncStorage from '@react-native-community/async-storage'

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('lang', value)
    } catch (e) {
        // saving error
    }
}

export class MainScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            list: [],
            currentScreen: 1,
            countScreens: 1,
            list2: [],
            modalVisible: false
        }
        this.ListPreview = React.createRef()
        this.updateView = this.updateView.bind(this)
        this.getChildState = this.getChildState.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    updateView(date, duration, cost){
        this.setState({loaded: false})

        axios.post('https://parser-for-time2travel.herokuapp.com/',{
            date, duration, cost
        })
            .then(res => {


                this.setState({loaded: true, list: shuffle(res.data)})

            })
            .catch(err => {
                console.error(err.message)
            })
    }

    getChildState(cur, count){

        this.setState({loaded: true, currentScreen: cur, countScreens: count})

    }

    changeLanguage(data){
        if(data){
            this.props.changeLanguage(data)
        }
    }

    toggleSwitch(previousState){
        this.setState({isEnabled: previousState})
    }

    render() {
        let backBtn
        let nextBtn

        if(this.state.loaded){
            return(
                <View style={{flex: 1}}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{width: 200, height: 250, flexDirection:"column"}}>
                                    <View>
                                        <View style={{alignItems: "center"}}>
                                            <Text style={{fontWeight: "bold", fontSize: 20}}>{languages.getLanguage()[10]}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", marginTop: 10, justifyContent: "space-between"}}>
                                            <Text style={{fontWeight: "bold", fontSize: 20, color: "grey"}}>{languages.getLanguage()[11]}</Text>
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={this.toggleSwitch}
                                                value={this.state.isEnabled}
                                            />
                                        </View>
                                        <View style={{flexDirection: "column", marginTop: 10}}>
                                            <View style={{justifyContent: "center"}}>
                                                <Text style={{fontSize: 20, fontWeight: "bold", color: "grey"}}>{languages.getLanguage()[12]}</Text>
                                            </View>

                                            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                                                <TouchableOpacity onPress={() => {
                                                    storeData("ukr")
                                                    languages.setLanguage().then(res=>{
                                                        this.changeLanguage(res)
                                                    })
                                                }}>
                                                    <Image
                                                        style={{width: 50, height: 50}}
                                                        source={require('../../img/ukr.png')}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    storeData("eng")
                                                    languages.setLanguage().then(res=>{
                                                        this.changeLanguage(res)
                                                    })
                                                }}>
                                                    <Image
                                                        style={{width: 50, height: 50}}
                                                        source={require('../../img/eng.png')}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    storeData("rus")
                                                    languages.setLanguage().then(res=>{
                                                        this.changeLanguage(res)
                                                    })
                                                }}>
                                                    <Image
                                                        style={{width: 50, height: 50}}
                                                        source={require('../../img/rus.png')}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                        <TouchableOpacity
                                            style={{ backgroundColor: "#2196F3", height: 40, marginTop: 20, alignItems: "center", justifyContent: "center"}}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}
                                        >
                                            <Text style={{fontSize: 16, fontWeight: "bold", color:"#fff"}}>{languages.getLanguage()[13]}</Text>
                                        </TouchableOpacity>
                                            <TouchableHighlight
                                                style={{ backgroundColor: "#2196F3", height: 40, marginTop: 10, alignItems: "center", justifyContent: "center"}}
                                                onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible);
                                                }}
                                            >
                                        <Text style={{fontSize: 16, fontWeight: "bold", color:"#fff"}}>{languages.getLanguage()[14]}</Text>
                                    </TouchableHighlight>

                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Header
                        leftComponent={
                            <IconButton
                                icon="menu"
                                color={'#ffffff'}
                                size={24}
                                onPress={() => this.props.openDrawer()}
                            />
                        }
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                        rightComponent={
                            <IconButton
                                icon="cog"
                                color={'#ffffff'}
                                size={24}
                                onPress={() => this.setModalVisible(true)}
                            />
                        }
                    />

                        <View style={{backgroundColor: '#efefef', justifyContent:"center"}}>
                            <Text style={{alignSelf: "center",fontWeight: "bold", color:"grey"}}>
                                 {languages.getLanguage()[9]} {(this.state.list2.length === 0) ? this.state.list.length : this.state.list2.length}
                            </Text>
                        </View>

                        <ScrollView style={{marginBottom: 35}}>
                            <ListPreview ref={this.ListPreview} stateUp={this.getChildState} list={(this.state.list2.length === 0) ? this.state.list : this.state.list2} />
                        </ScrollView>


                    {(this.state.currentScreen > 1) ? backBtn = false : backBtn = true}
                    {(this.state.currentScreen < this.state.countScreens) ? nextBtn = false : nextBtn = true}


                        <View style={{backgroundColor: '#efefef', flexDirection: "row", position: 'absolute', bottom:0, justifyContent:"center", width:"100%"}}>

                            <Button title={'        <<        '} disabled={backBtn} onPress={() => {
                                this.ListPreview.current.setScreen(this.state.currentScreen - 1)
                            }}/>
                            <View style={{margin: 7}}>
                                <Text style={{fontWeight: "bold", color: 'grey'}}>{this.state.currentScreen} / {this.state.countScreens}</Text>
                            </View>
                            <Button title={'        >>        '} disabled={nextBtn} onPress={() => {
                                this.ListPreview.current.setScreen(this.state.currentScreen + 1)
                            }}/>
                        </View>

                </View>
            );
        }else{
            return(
                <View>
                    <Header
                        leftComponent={
                            <IconButton
                                icon="menu"
                                color={'#ffffff'}
                                size={24}
                                onPress={() => this.props.openDrawer()}
                            />
                        }
                        centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                        rightComponent={
                            <IconButton
                                icon="cog"
                                color={'#ffffff'}
                                size={24}
                                onPress={() => this.setModalVisible(true)}
                            />
                        }
                    />

                        <View style={{alignItems: "center", justifyContent: "center", height: "85%"}}>
                            <ActivityIndicator animating={true} color={Colors.blue300} size="large" />
                        </View>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
