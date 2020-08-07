import AsyncStorage from '@react-native-community/async-storage'

module.exports = {
    style: "light",
    light:{
        searchbar: "#fff",
        backgroundSidebar: "#fff",
        backgroundContent: "#fff",
        label: "#9492c3",
        button: "#a28ec2",
        fontColor: "#385076",
        fontColor2: "#fff",
        underLine: "#b7b6c0",
        header: "#807cc3",
        blockNaideno: "#ded5ed",
        pressAnim: "#9492c3"
    },
    dark:{
        searchbar: "#463940",
        backgroundSidebar: "#17212b",
        backgroundContent: "#17212b",
        label: "#2b5278",
        button: "#463940",
        fontColor: "#fff",
        fontColor2: "#fff",
        underLine: "#0e1621",
        header: "#807cc3",
        blockNaideno: "#fff",
        pressAnim: "#9492c3"
    },
    getStyle: function () {
        switch (this.style) {
            case "light":
                return this.light
            case "dark":
                return this.dark
        }
    },
    setStyle: async function () {
        try {
            const value = await AsyncStorage.getItem('style')
            if(value !== null) {
                this.style = value
                return true
            }else{
                this.style = "light"
                return true
            }
        } catch(e) {
            // error reading value
        }

    }
}
