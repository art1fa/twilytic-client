import styled from 'styled-components';
import Paper from 'material-ui/Paper';


const StyledPaper = styled(Paper)`
  /* grid-column: 2;
  grid-row: 3 /4; */
  display: flex;
  flex-direction: column;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 1s 2s;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 1s;
  }
`;

const Content = styled.div`
  margin-top: 10px;
  overflow-y: auto;
  flex-grow: 1;
`;

export { StyledPaper, Content };
