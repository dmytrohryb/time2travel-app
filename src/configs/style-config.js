import AsyncStorage from '@react-native-community/async-storage'

module.exports = {
    style: "default",
    blue:{
        searchbar: "#fff",
        backgroundSidebar: "#fff",
        backgroundContent: "#fff",
        label: "#9492c3",
        button: "#a28ec2",
        fontColor: "#385076",
        fontColor2: "#fff",
        underLine: "#efecf4",
        header: "#807cc3",
        blockNaideno: "#ded5ed",
        pressAnim: "#9492c3",
        sortBar: "#f0edf5"
    },
    green:{
        searchbar: "#fff",
        backgroundSidebar: "#fff",
        backgroundContent: "#fff",
        label: "#83a244",
        button: "#8eca8e",
        fontColor: "#6a7638",
        fontColor2: "#fff",
        underLine: "#e9f4ea",
        header: "#83a244",
        blockNaideno: "#e2ebc8",
        pressAnim: "#c7d697",
        sortBar: "#f0f3e8"
    },
    red:{
        searchbar: "#fff",
        backgroundSidebar: "#fff",
        backgroundContent: "#fff",
        label: "#e39d8d",
        button: "#e37f68",
        fontColor: "#894f41",
        fontColor2: "#fff",
        underLine: "#f1d0c8",
        header: "#e39d8d",
        blockNaideno: "#f1c1b6",
        pressAnim: "#e39d8d",
        sortBar: "#f6ece9"
    },
    default:{
        searchbar: "#fff",
        backgroundSidebar: "#fff",
        backgroundContent: "#fff",
        label: "#fff",
        button: "#fff",
        fontColor: "#fff",
        fontColor2: "#fff",
        underLine: "#fff",
        header: "#fff",
        blockNaideno: "#fff",
        pressAnim: "#fff",
        sortBar: "#fff"
    },
    getStyle: function () {
        switch (this.style) {
            case "green":
                return this.green
            case "blue":
                return this.blue
            case "red":
                return this.red
            case "default":
                return this.default
        }
    },
    setStyle: async function () {
        try {
            const value = await AsyncStorage.getItem('style')
            if(value !== null) {
                this.style = value
                return true
            }else{
                this.style = "blue"
                return true
            }
        } catch(e) {
            // error reading value
        }

    }
}
