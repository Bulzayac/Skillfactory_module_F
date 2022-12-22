import React, { Component } from 'react'
import Body from './Body'
import Aboutblock from './Aboutblock'
import mainLogo from './extras/main-logo.png'

export default class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       apiKey: '3ef917bcb7e2b1878f5b1edb476818ab',
       location: null,
       mode: {
        inner: null,
        depth: '40',
        desc: null,
       },
       items: null,
       city: null,
       cityListItem: 'city-hid',
       about: {
        visiblity: false,
        textDesc: 'О сайте'
       },
    }
    this.getInfo = this.getInfo.bind(this);
    this.getExtra = this.getExtra.bind(this);
    this.invokeFetch = this.invokeFetch.bind(this);
    this.openList = this.openList.bind(this);
    this.aboutMenu = this.aboutMenu.bind(this);
  }

getInfo(){
    const {location, mode, apiKey} = this.state
    fetch(`https://api.openweathermap.org/data/2.5/${mode.inner}?q=${location}&appid=${apiKey}&lang=ru&units=metric&cnt=${mode.depth}`)
    .then((response)=>response.json())
    .then((result)=>{
        this.setState({
            items: result
        })
    })
    .catch(()=>{
        console.log('error')
    })
}

getExtra(event){
    if (event.target.className === 'city'){
        this.setState({
            location: event.target.id,
            city: event.target.textContent,
        })
        document.querySelector('.city-block .desc-string-hid')
        .className = 'desc-string'
    } else if (event.target.className === 'mode') {
        if (event.target.id === 'now') {
            this.setState({
                mode: {
                    inner: 'weather',
                    depth: '1',
                    desc: 'Погода сейчас',
                }
            })
            document.querySelector('.mode-block .desc-string-hid')
            .className = 'desc-string'
            document.querySelector('.mode-block .desc-invoker-hid')
            .className = 'desc-invoker'
        } else if (event.target.id === 'one-day') {
            this.setState({
                mode: {
                    inner: 'forecast',
                    depth: '9',
                    desc: 'Погода на ближайшие сутки',
                }
            })
            document.querySelector('.mode-block .desc-string-hid')
            .className = 'desc-string'
            document.querySelector('.mode-block .desc-invoker-hid')
            .className = 'desc-invoker'
        } else if (event.target.id === 'two-days') {
            this.setState({
                mode: {
                    inner: 'forecast',
                    depth: '17',
                    desc: 'Погода на ближайшие двое суток',
                }
            })
            document.querySelector('.mode-block .desc-string-hid')
            .className = 'desc-string'
            document.querySelector('.mode-block .desc-invoker-hid')
            .className = 'desc-invoker'
        } else {
            this.setState({
                mode: {
                    inner: 'forecast',
                    depth: '40',
                    desc: 'Погода на ближайшие пять суток',
                }
            })
            document.querySelector('.mode-block .desc-string-hid')
            .className = 'desc-string'
            document.querySelector('.mode-block .desc-invoker-hid')
            .className = 'desc-invoker'
        }
    }
}

invokeFetch() {
    if (this.state.mode.inner && this.state.location) {
        this.getInfo()
    } else {return;}
}

openList() {
    switch(this.state.cityListItem){
        case 'city':
            this.setState({
                cityListItem: 'city-hid'
            })
            break;
        case 'city-hid':
            this.setState({
                cityListItem: 'city'
            })
            break;
    }
}

aboutMenu() {
    switch(this.state.about.visiblity){
        case false:
            this.setState({
                about: {
                    visiblity: true,
                    textDesc: 'Скрыть'
                }
            })
            break;
        case true:
            this.setState({
                about: {
                    visiblity: false,
                    textDesc: 'О сайте'
                }
            })
            break;
    }
}

    render() {
    return (
      <div>
        <div className='header'>
            <div>
                <img className='icon' src={mainLogo} alt='Погода'></img>
            </div>
            <div className='menu'>
                <div className='city-block'>
                    <button onClick={this.openList}>Выберите город</button>
                    <button id='moscow' className={this.state.cityListItem}
                    onClick={this.getExtra}>Москва</button>
                    <button id='london' className={this.state.cityListItem}
                    onClick={this.getExtra}>Лондон</button>
                    <button id='paris' className={this.state.cityListItem}
                    onClick={this.getExtra}>Париж</button>
                    <button id='berlin' className={this.state.cityListItem}
                    onClick={this.getExtra}>Берлин</button>
                    <p className='desc-string-hid'>Выбранный город: {this.state.city}</p>
                </div>
                <div className='mode-block'>
                    <button id='now' className='mode'
                    onClick={this.getExtra}>Сейчас</button>
                    <button id='one-day' className='mode'
                    onClick={this.getExtra}>24 часа</button>
                    <button id='two-days' className='mode'
                    onClick={this.getExtra}>48 часов</button>
                    <button id='five-days' className='mode'
                    onClick={this.getExtra}>5 дней</button>
                    <p className='desc-string-hid'>
                        Режим просмотра: {this.state.mode.desc}
                    </p>
                    <button className='desc-invoker-hid'
                    onClick={this.invokeFetch}
                    >Cформировать</button>
                </div>
            </div>
            <div className='about'>
                <Aboutblock visible={this.state.about.visiblity}/>
                <button onClick={this.aboutMenu}>
                    {this.state.about.textDesc}</button>
            </div>
        </div>
        <div className='output-block'>
            <Body items={this.state.items}/>
        </div>
      </div>
    )
  }
}
