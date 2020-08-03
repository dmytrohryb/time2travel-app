import AsyncStorage from '@react-native-community/async-storage'

module.exports = {
    language: "default",
    ukr:[
        "Дата початку:",
        "оберіть дату",
        "Тривалість:",
        "Днів:",
        "Ціна:",
        "від",
        "до",
        "Застосувати",
        "Зкинути фільтри",
        "Всього знайдено:",
        "Налаштування",
        "Темна тема:",
        "Мова інтерфейсу:",
        "Відключити рекламу",
        "Закрити",
        "Організатор:",
        "Регіон:"
    ],
    rus:[
        "Дата начала:",
        "выберите дату",
        "Продолжительность:",
        "Дней:",
        "Цена:",
        "от",
        "до",
        "Применить",
        "Сбросить фильтры",
        "Всего найдено:",
        "Настройки",
        "Темная тема:",
        "Язык интерфейса:",
        "Отключить рекламу",
        "Закрыть",
        "Организатор:",
        "Регион:"
    ],
    eng:[
        "Start date:",
        "select date",
        "Duration:",
        "Days:",
        "Price:",
        "from",
        "to",
        "Apply",
        "Reset filters",
        "Total found:",
        "Settings",
        "Dark theme:",
        "Interface language:",
        "Disable ads",
        "Close",
        "Company:",
        "Region:"
    ],
    default:[
        "           ",
        "           ",
        "         ",
        "     ",
        "      ",
        "    ",
        "  ",
        "     ",
        "             ",
        "            ",
        "        ",
        "           ",
        "                   ",
        "           ",
        "     "
    ],
    getLanguage: function () {
        switch (this.language) {
            case "ukr":
                return this.ukr
            case "rus":
                return this.rus
            case "eng":
                return this.eng
            case "default":
                return this.default
        }
    },
    setLanguage: async function () {
        try {
            const value = await AsyncStorage.getItem('lang')
            if(value !== null) {
                this.language = value
                return true
            }else{
                this.language = "ukr"
                return true
            }
        } catch(e) {
                // error reading value
        }

    }
}