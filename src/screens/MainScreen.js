import React from 'react';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {ListPreview} from '../components/ListPreview';
import {Button, Text, View, ScrollView} from 'react-native';
import styles from '../configs/style-config'
import languages from '../configs/lang-config'
import {ActivityIndicator} from 'react-native-paper'
import bubbleSort from '../modules/priceSorting';
import bubbleSortDuration from '../modules/durationSorting'
import bubbleSortDat from '../modules/dateSorting'

export class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            list: [],
            currentScreen: 1,
            countScreens: 1,
            list2: [],
            search: '',
            sorted: false,
            sortedList: [],
            sortMode: 'default',
            typeSort: 'default'
        }

        this.ListPreview = React.createRef()
        this.getListPreviewState = this.getListPreviewState.bind(this)
        this.search = this.search.bind(this)
        this.sortPrice = this.sortPrice.bind(this)
        this.getCurrentList = this.getCurrentList.bind(this)
        this.sortDuration = this.sortDuration.bind(this)
        //this.sortDate = this.sortDate.bind(this)
    }

    /*
    sortDate(mode){
        this.setState({sortMode: mode, typeSort: 'date'})
        if(mode !== 'default'){
            if(this.state.search === ''){
                this.setState({sorted: true, sortedList: bubbleSortDat(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen, false)
                })
            }else{
                this.setState({sorted: true, sortedList: bubbleSortDat(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(1, true)
                })
            }
        }else{
            if(this.state.search === ''){
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen, false)
                })
            }else{
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(1, true)
                })
            }
        }
    }
    */

    sortPrice(mode){
        this.setState({sortMode: mode, typeSort: 'price'})
        if(mode !== 'default'){
            if(this.state.search === ''){
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen, false)
                })
            }else{
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(1, true)
                })
            }
        }else{
            if(this.state.search === ''){
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen, false)
                })
            }else{
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(1, true)
                })
            }
        }
    }

    sortDuration(mode){
        this.setState({sortMode: mode, typeSort: 'duration'})
        if(mode !== 'default'){
            if(this.state.search === ''){
                this.setState({sorted: true, sortedList: bubbleSortDuration(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen, false)
                })
            }else{
                this.setState({sorted: true, sortedList: bubbleSortDuration(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(1, true)
                })
            }
        }else{
            if(this.state.search === ''){
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen, false)
                })
            }else{
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(1, true)
                })
            }
        }
    }
    //https://parser-for-time2travel.herokuapp.com/
    componentDidMount() {
        axios.post('https://parser-for-time2travel.herokuapp.com/',{
            startDate: '', finishDate: '', cost: {min: '', max: ''}
        })
            .then(res => {
                this.setState({list: res.data, loaded: true})
            })
            .catch(err => {
                console.error(err.message)
            })
    }

    updateView(data) {
        this.setState({loaded: false})
        console.log({
            startDate: data.startDate, finishDate: data.finishDate, cost: {min: data.minPrice, max: data.maxPrice}
        })
        axios.post('https://parser-for-time2travel.herokuapp.com/',{
            startDate: data.startDate, finishDate: data.finishDate, cost: {min: data.minPrice, max: data.maxPrice}
        })
            .then(res => {
                this.setState({list: res.data, loaded: true, sortedList: [], sorted: false, list2: [], search: '', sortMode: 'default', typeSort: 'default'})
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
                this.ListPreview.current.setScreen(1, false)
            })


    }

    getListPreviewState(cur, count){
        this.setState({currentScreen: cur, countScreens: count})
    }

    getCurrentList(){
        //(this.state.search === '') ? ((this.state.sorted) ? this.state.sortedList : this.state.list) : ((this.state.sorted) ? this.state.sortedList : this.state.list2)
        let data = ''
        if(this.state.typeSort === 'price'){
            data = bubbleSort(this.state.list2, this.state.sortMode)
        }else if(this.state.typeSort === 'duration'){
            data = bubbleSortDuration(this.state.list2, this.state.sortMode)
        }else if(this.state.typeSort === 'date'){
            data = bubbleSortDat(this.state.list2, this.state.sortMode)
        }

        if(this.state.sorted){
            if(this.state.search === ''){
                return this.state.sortedList
            }else{
                return data
            }
        }else{
            if(this.state.search === ''){
                return this.state.list
            }else{
                return this.state.list2
            }
        }
    }

    render() {
        let backBtn, nextBtn
        let list = this.getCurrentList()
        return <>
            <Searchbar style={{backgroundColor: styles.getStyle().searchbar}} onChangeText={this.search}></Searchbar>

            <View style={{backgroundColor: styles.getStyle().blockNaideno, justifyContent:"center", paddingVertical: 2}}>
                <Text style={{alignSelf: "center", fontWeight: "bold", color:"grey"}}>
                    {languages.getLanguage()[9]} {(this.state.search === '') ? this.state.list.length : this.state.list2.length}
                </Text>
            </View>

            {(this.state.loaded) ? <>
                    <ScrollView style={{marginBottom: 35}}>
                        <ListPreview
                            ref={this.ListPreview}
                            list={list/*(this.state.search === '') ? this.state.list : this.state.list2*/}
                            stateUp={this.getListPreviewState}
                            sortPrice={this.sortPrice}
                            sortDuration={this.sortDuration}
                            //sortDate={this.sortDate}
                        />
                    </ScrollView>

                    {(this.state.currentScreen > 1) ? backBtn = false : backBtn = true}
                    {(this.state.currentScreen < this.state.countScreens) ? nextBtn = false : nextBtn = true}
                    <View style={{backgroundColor: '#efefef', flexDirection: "row", position: 'absolute', bottom:0, justifyContent:"center", width:"100%"}}>

                        <Button color={styles.getStyle().button} title={'        <<        '} disabled={backBtn} onPress={() => {
                            this.ListPreview.current.setScreen(this.state.currentScreen - 1, true)
                        }}/>
                        <View style={{margin: 7}}>
                            <Text style={{fontWeight: "bold", color: 'grey'}}>{this.state.currentScreen} / {this.state.countScreens}</Text>
                        </View>
                        <Button color={styles.getStyle().button} title={'        >>        '} disabled={nextBtn} onPress={() => {
                            this.ListPreview.current.setScreen(this.state.currentScreen + 1, true)
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


/*
sortPrice(mode){
        if(mode === 'up'){
            if(this.state.search === ''){
                // sorting list
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })

            }else{
                // sorting list2
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list2, mode)}, () => {
                    this.ListPreview.current.setScreen(1, false)
                })
            }
        }else if(mode === 'down'){
            if(this.state.search === ''){
                // sorting list
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })

            }else{
                // sorting list2
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list2, mode)}, () => {
                    this.ListPreview.current.setScreen(1, false)
                })
            }
        }else{
            if(this.state.search === ''){
                // sorting list
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })

            }else{
                // sorting list2
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(1, false)
                })
            }
        }
    }





    sortPrice(mode){
        if(mode === 'up'){
            if(this.state.search === ''){
                // sorting list
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })

            }else{
                // sorting list2
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list2, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })
            }
        }else if(mode === 'down'){
            if(this.state.search === ''){
                // sorting list
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })

            }else{
                // sorting list2
                this.setState({sorted: true, sortedList: bubbleSort(this.state.list2, mode)}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })
            }
        }else{
            if(this.state.search === ''){
                // sorting list
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })

            }else{
                // sorting list2
                this.setState({sorted: false, sortedList: []}, () => {
                    this.ListPreview.current.setScreen(this.state.currentScreen)
                })
            }
        }
    }

    search(value) {
        let tempData = []
        let count = 0

        if(this.state.sorted){
            console.log('sorted')
            for(let i = 0; i < this.state.sortedList.length; i++){
                if(this.state.sortedList[i].title.match(value) || this.state.sortedList[i].location.match(value)){
                    tempData.push(this.state.sortedList[i])
                }
            }
            this.setState({sortedList: tempData, search: value}, () => {
                this.ListPreview.current.setScreen(1)
            })
        }else{
            for(let i = 0; i < this.state.list.length; i++){
                if(this.state.list[i].title.match(value) || this.state.list[i].location.match(value)){
                    tempData.push(this.state.list[i])
                }
            }
            this.setState({list2: tempData, search: value}, () => {
                this.ListPreview.current.setScreen(1)
            })
        }

    }
 */
