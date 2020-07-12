import {Button, Text, View} from "react-native";
import {styles} from "./Styles";
import DatePicker from "react-native-datepicker";
import {CheckBox, Slider} from "react-native-elements";
import React, {useEffect, useState} from "react";

export const navigationView = (date, countDays, onlyUkraine, stateUp) => {

    let state = {
        date: date,
        countDays: countDays,
        onlyUkraine: onlyUkraine
    }


    return (
        <View style={styles.navigationContainer}>
            <View style={{padding: 10, marginTop: 150, backgroundColor: '#0080ff'}}>
                <Text style={{color: '#fff'}}>Дата начала: </Text>
            </View>
            <DatePicker
                style={{width: 280, marginTop: 20}}
                date={state.date}
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
                //onDateChange={}
            />
            <View style={{padding:10, marginTop: 20, marginBottom: 10, backgroundColor: '#0080ff'}}>
                <Text style={{color: '#fff'}}>Продолжительность: </Text>
            </View>
            <Slider
                minimumValue={1}
                maximumValue={14}
                step={1}
                thumbTintColor='#0080ff'
                //value={}
                //onValueChange={}
            />
            <Text>Дней: {}</Text>

            <View style={{marginTop: 20, marginBottom: 10}}>
                <CheckBox
                    size={16}
                    title='Искать только по Украине'
                    //checked={}
                    //onPress={}
                />
            </View>

            <Button
                title="Применить"
                onPress={()=>{

                }}
            />
        </View>
    )
}

