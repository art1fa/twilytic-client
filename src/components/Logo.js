import React from 'react';

import logo from '../res/twilytic_horizontal.png';

import { Wrapper } from '../styles/Logo';

export default function Logo(props) {
  return (
    <Wrapper>
      <a href={process.env.REACT_APP_API_URL}>
        <img src={logo} alt="logo" style={{ maxWidth: '80%' }} />
      </a>
    </Wrapper>
  );
}

