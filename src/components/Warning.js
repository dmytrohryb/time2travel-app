import Dialog, { DialogContent } from 'react-native-popup-dialog';
import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from '../configs/style-config';
import languages from '../configs/lang-config';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class Warning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            warning: ''
        }

        this.showWarning = this.showWarning.bind(this)
        this.hideWarning = this.hideWarning.bind(this)
    }

    showWarning(warning){
        this.setState({visible: true, warning: warning})
    }

    hideWarning(){
        this.setState({visible: false})
        setTimeout(() => {
            this.setState({warning: ''})
        }, 250)
    }

    render() {
        return<>
            <Dialog visible={this.state.visible}>
                <DialogContent style={{maxWidth: 280}}>
                    <View style={{flexDirection: 'row', marginTop: 20, alignSelf: 'center'}}>
                        <Icon name="exclamation-triangle" size={20} color="#900" />
                        <Text>Warning</Text>
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10}}>
                        <Text style={{marginTop: 10, marginBottom: 10, textAlign: 'justify'}}>{this.state.warning}</Text>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                        <View style={{width: 100}}>
                            <Button
                                color={styles.getStyle().button}
                                title={languages.getLanguage()[25]}
                                onPress={()=>{
                                    this.hideWarning()
                                }}
                            />
                        </View>
                    </View>
                </DialogContent>
            </Dialog>
            </>
    }
}
