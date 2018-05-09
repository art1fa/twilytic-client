import styled, { css } from 'styled-components';
import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles/';

import withFade from '../components/withFade';


const sizes = {
  large: 1600,
  medium: 1000,
};

// Iterate through the sizes and create a media template
const media = Object
  .keys(sizes)
  .reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(...args)}
      }
    `;

    return acc;
  }, {});

const AppWrapper = withTheme()(styled.div`
  min-height: 100%;
  position: relative;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background-color: ${({ theme }) => theme.palette.background.default};
  transition: background-color 1s;
`);

const Body = styled.div`
  padding-bottom: 250px;
`;

const SectionHeadline = withFade()(styled(Typography)`
  margin-left: 20px !important;
  margin-top: 80px !important;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 1s ${(props) => props.delay};
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 1s;
  }
`);

const Grid = styled.section`
    margin-top: 30px;
    display: grid;
    grid-gap: 30px;
    grid-auto-rows: 450px;
    grid-template-columns: minmax(370px, 600px);
    grid-auto-flow: dense;
    justify-content: space-around;	

    
    /*to prevent resizing of grid items*/
    min-width: 0;
    min-height: 0;

    ${media.medium`
      grid-template-columns: repeat(2, minmax(450px, 600px));
      margin: 30px;
    `}
    ${media.large`
      grid-template-columns: repeat(3, minmax(500px, 600px));
      margin: 30px;
    `}
`;

export { AppWrapper, Body, SectionHeadline, Grid };
