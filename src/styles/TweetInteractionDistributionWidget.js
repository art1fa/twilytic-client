import styled from 'styled-components';
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography';


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
    transition: opacity 1s 1.5s;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 1s;
  }
`;

const AverageCount = styled(Typography)`
  position: absolute;
  right: 40px;
  top: 20px;
  opacity: 0.5;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  flex-grow: 1;

  & > div {
    flex-grow: 1;
  }
  `;

export { StyledPaper, AverageCount, Content };
