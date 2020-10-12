import React from 'react'
import {DrawerLayoutAndroid} from 'react-native';
import {Header} from 'react-native-elements';
import {MainScreen} from './src/screens/MainScreen';
import {Sidebar} from './src/components/Sidebar';
import languages from './src/configs/lang-config';
import styles from './src/configs/style-config';
import {displayName as appName} from './app.json';
import {IconButton} from 'react-native-paper'
import {Settings} from './src/components/Settings';

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
        this.MainScreen = React.createRef()
        this.Sidebar = React.createRef()
        this.Settings = React.createRef()
        this.changeLanguage = this.changeLanguage.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
        this.openSidebar = this.openSidebar.bind(this)
        this.closeSidebar = this.closeSidebar.bind(this)
        this.updateView = this.updateView.bind(this)
    }

    updateView(data){
        this.MainScreen.current.updateView(data)
    }

    changeLanguage(){
        this.forceUpdate()
    }

    changeTheme(){
        this.forceUpdate()
    }

    componentDidMount() {
        //this.MainScreen.current.updateView(this.state.date, this.state.duration, {min: this.state.min, max: this.state.max})
        languages.setLanguage().then(res => {
            this.changeLanguage()
        })
        styles.setStyle().then(res => {
            this.changeTheme()
        })
    }

    openSidebar(){
        this.refs['Drawer'].openDrawer()
    }

    closeSidebar(){
        this.refs['Drawer'].closeDrawer()
    }

    render() {
        return (
            <>
                <DrawerLayoutAndroid
                    ref={'Drawer'}
                    drawerWidth={300}
                    drawerPosition={'left'}
                    renderNavigationView={() => <Sidebar updateView={this.updateView} openSidebar={this.openSidebar} closeSidebar={this.closeSidebar} ref={this.Sidebar} />}
                >
                <Settings ref={this.Settings} changeLanguage={this.changeLanguage} changeTheme={this.changeTheme} visible={false} />
                <Header
                    backgroundColor={styles.getStyle().header}
                    leftComponent={
                        <IconButton
                            icon="menu"
                            color={'#ffffff'}
                            size={24}
                            onPress={() => this.openSidebar()}
                        />
                    }
                    centerComponent={{ text: 'TIME 2 TRAVEL', style: { color: '#fff', fontWeight: "bold", fontSize: 16 } }}
                    rightComponent={
                        <IconButton
                            icon="cog"
                            color={'#ffffff'}
                            size={24}
                            onPress={() => this.Settings.current.openModal()}
                        />
                    }
                />

                <MainScreen ref={this.MainScreen} list={this.state.data}/>
                </DrawerLayoutAndroid>
            </>
        );
    }
};
