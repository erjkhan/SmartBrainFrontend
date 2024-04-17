import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo =()=>
{
	return (
	<div className = 'ma4 mt0'>
	<Tilt className='br2 shadow-2 ' props={{tiltMaxAngleX: 55}} style={{ height: '150px' , width :'150px' }}>
      <div className='pa3 ' >
        <img alt ='logo' src= {brain} style={{ paddingTop:'5px'}} />
      </div>
    </Tilt>
	</div>
		);
}

export default Logo ;