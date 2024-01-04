import React from 'react';
import Tilt from 'react-parallax-tilt';
import icon from './icon.png';

const Logo = () => {
    return (
       <div className= 'ma4 mt3'>
         <Tilt className='Tilt' options={{ max: 25 }} 
         style={{ height: '100px', width: '100px' }}>
         <img alt='icon' src={icon}></img>
         </Tilt>
       </div>
    );
}

export default Logo;