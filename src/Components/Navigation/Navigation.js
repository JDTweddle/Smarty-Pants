import React from 'react';

const Navigation = ({ onRouteChange }) => {
  return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <p onClick={() => onRouteChange('signin')} className='f3 link black underline pa3 grow pointer'>
          <button className="b f4 bg-transparent sign-out-button">Sign Out</button>
        </p>
      </nav>
    )
}

export default Navigation;