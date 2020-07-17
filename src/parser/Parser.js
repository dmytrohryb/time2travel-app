import {getDataProidysvit} from './ProidysvitData'
import {getDataPohodvgory} from "./PohodvgoryData"
import axios from 'axios'

export let Parser = async (date, duration, cost) => {
    const data = []
    const cur = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')

    //proidysvit
    let temp = await getDataProidysvit(date, duration, cost, cur.data)
    for (let i = 0; i < temp.length; i++){
        data.push(temp[i])
    }
    //pohod-v-gory
    let temp2 = await getDataPohodvgory(date, duration, cost, cur.data)
    for (let i = 0; i < temp2.length; i++){
        data.push(temp2[i])
    }

    return data
}
