import React from 'react'
import style from "../configs/style-config"
import {Modal, View, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight} from 'react-native'
import languages from "../configs/lang-config"

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('lang', value)
    } catch (e) {
        // saving error
    }
}

export class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{width: 200, height: 300, flexDirection:"column"}}>
                            <View>
                                <View style={{alignItems: "center"}}>
                                    <Text style={{fontWeight: "bold", fontSize: 20}}>{languages.getLanguage()[10]}</Text>
                                </View>

                                <Text style={{fontWeight: "bold", fontSize: 20, color: "grey"}}>{languages.getLanguage()[11]}</Text>
                                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.toggleSwitch("light")

                                    }}>
                                        <Image
                                            style={{width: 50, height: 50}}
                                            source={require('../../img/1.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.toggleSwitch("dark")

                                    }}>
                                        <Image
                                            style={{width: 50, height: 50}}
                                            source={require('../../img/2.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.toggleSwitch("red")
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
                                                this.props.changeLanguage(res)
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
                                                this.props.changeLanguage(res)
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
                                                this.props.changeLanguage(res)
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
                                style={{ backgroundColor: style.getStyle().button, height: 40, marginTop: 20, alignItems: "center", justifyContent: "center"}}
                                onPress={() => {
                                    this.props.setModalVisible(!this.props.modalVisible);
                                }}
                            >
                                <Text style={{fontSize: 16, fontWeight: "bold", color:"#fff"}}>{languages.getLanguage()[13]}</Text>
                            </TouchableOpacity>
                            <TouchableHighlight
                                style={{ backgroundColor: style.getStyle().button, height: 40, marginTop: 10, alignItems: "center", justifyContent: "center"}}
                                onPress={() => {
                                    this.props.setModalVisible(!this.props.modalVisible);
                                }}
                            >
                                <Text style={{fontSize: 16, fontWeight: "bold", color:"#fff"}}>{languages.getLanguage()[14]}</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </View>
            </Modal>
        )
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
