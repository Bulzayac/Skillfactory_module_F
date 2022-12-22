import React, { Component } from 'react'

export default class Aboutblock extends Component {
  render() {
    if (this.props.visible) {
      return (
        <div className='about-block'>
          <p>By Ilya Vinnikov</p>
          <p>Skillfactory</p>
          <p>2022</p>
          <p>GitHub:Bulzayac</p>
        </div>
      )
    }
  }
}
