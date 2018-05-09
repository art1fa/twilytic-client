import styled from 'styled-components';
import { withTheme } from 'material-ui/styles';

const Wrapper = withTheme()(styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  background-color: ${({ theme }) => theme.palette.background.footer};
  color: ${({ theme }) => theme.palette.text.secondary};
  height: 150px;
  margin-top: 30px;
  text-align: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: 1s;
`);

const Content = styled.div`
  margin: 20px;
`;

const Link = styled.a`
  color: inherit;

  &:hover {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
`;

export { Wrapper, Content, Link };
