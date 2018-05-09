import styled from 'styled-components';
import Paper from 'material-ui/Paper';


const StyledPaper = styled(Paper)`
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    min-width: 350px;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 1s 0.5s;
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
    overflow-y: auto;
`;

export { Content, StyledPaper };
