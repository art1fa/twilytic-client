import React from 'react';

import logo from '../res/twilytic_horizontal.png';

import { Wrapper } from '../styles/Logo';

export default function Logo(props) {
  return (
    <Wrapper>
      <a href="http://localhost:3000">
        <img src={logo} alt="logo" style={{ maxWidth: '80%' }} />
      </a>
    </Wrapper>
  );
}

