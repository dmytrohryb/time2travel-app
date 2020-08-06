import AsyncStorage from '@react-native-community/async-storage'

module.exports = {
    style: "light",
    light:{
        background: "#fff",
        label: "#0080ff",
        button: "#2296f3"
    },
    dark:{
        background: "#284066",
        label: "#1f314f",
        button: "#0d1f3d"
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
