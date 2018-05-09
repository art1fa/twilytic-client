import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import { withTheme } from 'material-ui/styles';


const Content = styled.div`
  padding: 10px 30px 30px 30px;
  max-width: 1000px;
  margin: auto;
`;

const StyledPaper = withTheme()(styled(Paper)`
  width: 100%;
  max-width: 1060px;
  margin: auto;
  margin-bottom: 30px;
  padding: 15px 0;
  transition: max-width 0.3s, background-color 1s;
  color: ${({ theme }) => theme.palette.text.secondary};


  &.active {
    background-color: ${({ theme }) => theme.palette.background.search};
    max-width: 4000px;
    box-shadow: none;
  }

`);

const SearchMain = styled.div`
  display: flex;
  margin-top: 20px;
`;


export { Content, StyledPaper, SearchMain };