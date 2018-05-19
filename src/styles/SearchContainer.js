import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import { withTheme } from 'material-ui/styles';


const Content = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const Wrapper = withTheme()(styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-bottom: 30px;
  padding: 15px 0;
  color: ${({ theme }) => theme.palette.text.secondary};
  transition: max-width 0.3s, background-color 1s;

  &.active {
    background-color: ${({ theme }) => theme.palette.background.search};
    max-width: 100%;
  }
`);

const SearchBar = styled(Paper)`
  padding: 20px;

  &.active {
    box-shadow: none;
    background-color: inherit;
  }
`;


export { Content, Wrapper, SearchBar };
