import AsyncStorage from '@react-native-community/async-storage'

module.exports = {
    language: "default",
    ukr:[
        "Початкова дата:",
        "оберіть дату",
        "Кінцева дата:",
        "Днів:",
        "Ціна",
        "від",
        "до",
        "Застосувати",
        "Зкинути фільтри",
        "Всього знайдено:",
        "Налаштування",
        "Тема оформлення:",
        "Мова інтерфейсу:",
        "Про додаток",
        "Закрити",
        "Організатор:",
        "Регіон:",
        "Оцінити дотаток",
        "Походи",
        "Екскурсії",
        "Тип:",
        "день",
        "дня",
        "днів",
        "грн",
        "OK",
        "Мінімальна ціна не може перевищувати максимальну ціну, будь-ласка звеніть увагу на фільтр діапазону цін",
        "Початкова дата не може бути більшою за кінцеву дату, будь-ласка зверніть увагу на фільтр діапазону дат",
        "Тривалість",
        "Список підключених сайтів:", //29
        "Extremeguide.pro",
        "Greentravel.biz",
        "Kuluarpohod.com",
        "Marshrut-club.com",
        "Pohod-v-gory.com",
        "Proydisvit.com"
    ],
    rus:[
        "Начальная дата:",
        "выберите дату",
        "Конечная дата:",
        "Дней:",
        "Цена",
        "от",
        "до",
        "Применить",
        "Сбросить фильтры",
        "Всего найдено:",
        "Настройки",
        "Тема оформления:",
        "Язык интерфейса:",
        "О приложении",
        "Закрыть",
        "Организатор:",
        "Регион:",
        "Оценить приложение",
        "Походы",
        "Экскурсии",
        "Тип: ",
        "день",
        "дня",
        "дней",
        "грн",
        "OK",
        "Минимальная цена не может превышать максимальную цену, обратите внимание на фильтр диапазона цен",
        "Начальная дата не может быть больше конечной даты, обартите внимание на фильтр диапазона дат",
        "Длительность",
        "Список подключенных сайтов:", //29
        "Extremeguide.pro",
        "Greentravel.biz",
        "Kuluarpohod.com",
        "Marshrut-club.com",
        "Pohod-v-gory.com",
        "Proydisvit.com"
    ],
    eng:[
        "Start date:",
        "select date",
        "Finish date:",
        "Days:",
        "Price",
        "from",
        "to",
        "Apply",
        "Reset filters",
        "Total found:",
        "Settings",
        "Theme:",
        "Interface language:",
        "About",
        "Close",
        "Company:",
        "Region:",
        "Evaluate the application",
        "Hiking",
        "Excursions",
        "Type: ",
        "day",
        "days",
        "days",
        "UAH",
        "OK",
        "The minimum price cannot be higher than the maximum, please note the price range filter",
        "Start date cannot be greater than end date, please note the date range filter",
        "Duration",
        "List of connected sites:", //29
        "Extremeguide.pro",
        "Greentravel.biz",
        "Kuluarpohod.com",
        "Marshrut-club.com",
        "Pohod-v-gory.com",
        "Proydisvit.com"
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
        "     ",
        "     ",
        "     ",
        "                        ",
        " ",
        " ",
        " ",
        " "
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
