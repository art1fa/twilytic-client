import React from 'react';

import { Wrapper, Content, Link } from '../styles/Footer';

export default function Footer() {
  return (
    <Wrapper>
      <Content>
        <span style={{ display: 'block', 'lineHeight': '1.8' }}>
          Made with ❤️ by Fabian Keitel
        </span>
        <Link href="#">Impressum</Link>
        <span> | </span>
        <Link href="#">Datenschutz</Link>
      </Content>
    </Wrapper>
  );
}
