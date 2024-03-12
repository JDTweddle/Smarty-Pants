import React, { Component } from 'react'
import ParticlesBg from 'particles-bg'
import './Particles.css'

class Particles extends Component {
  render () {
    return (
      <>
        <div>
          <ParticlesBg 
          color="#000000" 
          num={50} 
          type="cobweb" 
          bg={true} />
        </div>
      </>
    )
  }
}

export default Particles;