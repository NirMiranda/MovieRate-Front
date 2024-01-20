import React from 'react';
import WhiteLogo from '../NavBar/LogoFiles/svg/White logo.svg'
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#21081a' }}>
      <div className='text-center p-3' style={{ backgroundColor: 'rgb(34, 34, 34)' }}>
      <img src={WhiteLogo} alt="Logo" style={{ maxHeight: '30px', marginRight: '10px' }} />
        © 2024 Copyright:
        <a className='text-white'>
          MoView LTD
        </a>
      </div>
    </MDBFooter>
  );
}