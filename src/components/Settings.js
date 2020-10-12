import React from 'react'
import styles from "../configs/style-config"
import {Modal, View, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight} from 'react-native'
import languages from "../configs/lang-config"
import AsyncStorage from '@react-native-community/async-storage'

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('lang', value)
    } catch (e) {
        // saving error
    }
}

const addStoreStyle = async (value) => {
    try{
        await AsyncStorage.setItem('style', value)
    }catch (e){

    }
}

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            settings: true
        }

        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.changeInfoWindow = this.changeInfoWindow.bind(this)
        this.changeSettingWindow = this.changeSettingWindow.bind(this)
    }

    toggleSwitch(style){
        addStoreStyle(style)
        styles.setStyle().then(res=>{
            this.props.changeTheme()
        })
    }

    changeInfoWindow(){
        this.setState({settings: false})
    }

    changeSettingWindow(){
        this.setState({settings: true})
    }

    changeLanguage(data){
        this.props.changeLanguage(data)
    }

    openModal(){
        this.setState({visible: true})
    }

    closeModal(){
        this.setState({visible: false})
    }

    render(){
        let content = (this.state.settings) ? <>
            <View style={{width: 200, height: 300, flexDirection:"column"}}>
                <View>
                    <View style={{alignItems: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>{languages.getLanguage()[10]}</Text>
                    </View>

                    <Text style={{fontWeight: "bold", fontSize: 20, color: "grey"}}>{languages.getLanguage()[11]}</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                        <TouchableOpacity onPress={() => {
                            this.toggleSwitch("blue")

                        }}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={require('../../img/1.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.toggleSwitch("green")

                        }}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={require('../../img/2.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.toggleSwitch("red")
                        }}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={require('../../img/3.png')}
                            />
                        </TouchableOpacity>
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
                    style={{ backgroundColor: styles.getStyle().button, height: 40, marginTop: 20, alignItems: "center", justifyContent: "center"}}
                    onPress={() => {
                        this.changeInfoWindow();
                    }}
                >
                    <Text style={{fontSize: 16, fontWeight: "bold", color:"#fff"}}>{languages.getLanguage()[13]}</Text>
                </TouchableOpacity>
                <TouchableHighlight
                    style={{ backgroundColor: styles.getStyle().button, height: 40, marginTop: 10, alignItems: "center", justifyContent: "center"}}
                    onPress={() => {
                        this.closeModal()
                    }}
                >
                    <Text style={{fontSize: 16, fontWeight: "bold", color:"#fff"}}>{languages.getLanguage()[14]}</Text>
                </TouchableHighlight>

            </View>
        </> : <>
            <View style={{width: 200, height: 180, flexDirection:"column"}}>
                <Text style={{fontSize: 14}}>{languages.getLanguage()[29]}</Text>
                <Text>{languages.getLanguage()[30]}</Text>
                <Text>{languages.getLanguage()[31]}</Text>
                <Text>{languages.getLanguage()[32]}</Text>
                <Text>{languages.getLanguage()[33]}</Text>
                <Text>{languages.getLanguage()[34]}</Text>
                <Text>{languages.getLanguage()[35]}</Text>
                <TouchableHighlight
                    style={{ backgroundColor: styles.getStyle().button, height: 40, marginTop: 10, alignItems: "center", justifyContent: "center"}}
                    onPress={() => {
                        this.changeSettingWindow()
                    }}
                >
                    <Text style={{fontSize: 16, fontWeight: "bold", color:"#fff"}}>Вернуться к настройкам</Text>
                </TouchableHighlight>
            </View>
        </>
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.visible}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        {content}
                    </View>
                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
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
