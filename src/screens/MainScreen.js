import React from 'react';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {ListPreview} from '../components/ListPreview';
import {Button, Text, View, ScrollView} from 'react-native';
import styles from '../configs/style-config'
import languages from '../configs/lang-config'
import {ActivityIndicator} from 'react-native-paper'
import {Sortbar} from '../components/Sortbar';

export class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            list: [],
            currentScreen: 1,
            countScreens: 1,
            list2: [],
            search: ''
        }

        this.ListPreview = React.createRef()
        this.getListPreviewState = this.getListPreviewState.bind(this)
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        axios.post('https://parser-for-time2travel.herokuapp.com/',{
            date: '', duration: '', cost: {min: '', max: ''}
        })
            .then(res => {
                this.setState({list: res.data, loaded: true})
            })
            .catch(err => {
                console.error(err.message)
            })
    }

    search(value) {
        let tempData = []
        let count = 0

        for(let i = 0; i < this.state.list.length; i++){
            if(this.state.list[i].title.match(value) || this.state.list[i].location.match(value)){
                tempData.push(this.state.list[i])
            }
        }

        this.setState({list2: tempData, search: value}, () => {
            this.ListPreview.current.setScreen(this.state.currentScreen)
        })
    }

    getListPreviewState(cur, count){
        this.setState({currentScreen: cur, countScreens: count})
    }

    render() {
        let backBtn, nextBtn
        return <>
            <Searchbar style={{backgroundColor: styles.getStyle().searchbar}} onChangeText={this.search}></Searchbar>

            <View style={{backgroundColor: styles.getStyle().blockNaideno, justifyContent:"center"}}>
                <Text style={{alignSelf: "center", fontWeight: "bold", color:"grey"}}>
                    {languages.getLanguage()[9]} {(this.state.search === '') ? this.state.list.length : this.state.list2.length}
                </Text>
            </View>
            <Sortbar />
            {(this.state.loaded) ? <>
                    <ScrollView style={{marginBottom: 35}}>
                        <ListPreview ref={this.ListPreview} list={(this.state.search === '') ? this.state.list : this.state.list2} stateUp={this.getListPreviewState}/>
                    </ScrollView>

                    {(this.state.currentScreen > 1) ? backBtn = false : backBtn = true}
                    {(this.state.currentScreen < this.state.countScreens) ? nextBtn = false : nextBtn = true}
                    <View style={{backgroundColor: '#efefef', flexDirection: "row", position: 'absolute', bottom:0, justifyContent:"center", width:"100%"}}>

                        <Button color={styles.getStyle().button} title={'        <<        '} disabled={backBtn} onPress={() => {
                            this.ListPreview.current.setScreen(this.state.currentScreen - 1)
                        }}/>
                        <View style={{margin: 7}}>
                            <Text style={{fontWeight: "bold", color: 'grey'}}>{this.state.currentScreen} / {this.state.countScreens}</Text>
                        </View>
                        <Button color={styles.getStyle().button} title={'        >>        '} disabled={nextBtn} onPress={() => {
                            this.ListPreview.current.setScreen(this.state.currentScreen + 1)
                        }}/>
                    </View>
                </> : <>
                    <View style={{alignItems: "center", justifyContent: "center", height: "85%"}}>
                        <ActivityIndicator animating={true} color={styles.getStyle().button} size="large" />
                    </View>
                </>}

        </>
    }
}
