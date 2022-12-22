import React, { Component } from 'react'

export default class Body extends Component {

windConverter(direction){
    const dir = Number(direction);
    let result
    if (327 < dir || dir < 23) {
        result = 'ветер северный'
    } else if (23 <= dir && dir <= 67) {
        result = 'ветер северо-восточный'
    } else if (68 <= dir && dir <= 112) {
        result = 'ветер восточный'
    } else if (113 <= dir && dir <= 157) {
        result = 'ветер юго-восточный'
    } else if (158 <= dir && dir <= 202) {
        result = 'ветер южный'
    } else if (203 <= dir && dir <= 247) {
        result = 'ветер юго-западный'
    } else if (248 <= dir && dir <= 292) {
        result = 'ветер западный'
    } else if (293 <= dir && dir <= 327) {
        result = 'ветер северо-западный'
    }
    return result;
}

tempStyle(temp) {
    if (temp < 8) {
        return `rgb(0, ${0 + ((temp+21)*9)}, 255)`;
    } else {
        return `rgb(255, ${327 - ((temp)*9)}, 0)`;
    }
    
}

render() {
    if(!this.props.items){
        return (
        <div>
            <p className='default-desc'>Пожалуйста выберите параметры запроса</p>
        </div>
        )
    } else {
        if (this.props.items.dt) {
            return (
                <div className='single-output'>
                    <p className='main-temp'
                    style={{color: this.tempStyle(Math.round(this.props.items.main.temp))}}>
                        {Math.round(this.props.items.main.temp)}°</p>
                    <p className='main-desc'>
                        {this.props.items.weather[0].description}, 
                        ощущается как {Math.round(this.props.items.main.feels_like)}°</p>
                    <p className='wind-info'>
                        {this.windConverter(this.props.items.wind.deg)},
                        {Math.round(this.props.items.wind.speed)} м/с</p>
                </div>  
            )
        } else {
            return (
                <div className='list-output'>
                    {this.props.items.list.map(
                        item => (
                            <div key={item.dt} className='output-item'>
                                <p className='time-info'>{item.dt_txt}</p>
                                <p className='main-temp'
                                style={{color: this.tempStyle(Math.round(item.main.temp))}}>
                                    {Math.round(item.main.temp)}°</p>
                                <p className='main-desc'>
                                    {item.weather[0].description}, 
                                    ощущается как {Math.round(item.main.feels_like)}°</p>
                                <p className='wind-info'>
                                    {this.windConverter(item.wind.deg)},  
                                    {Math.round(item.wind.speed)} м/с</p>
                            </div>
                        )
                    )}
                </div>  
            )
        }
    }
    }
}
