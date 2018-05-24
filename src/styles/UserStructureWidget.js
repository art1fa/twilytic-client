import styled from 'styled-components';
import Paper from 'material-ui/Paper'


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
    transition: opacity 1s 2.25s;
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
  padding: 20px;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const Tags = styled.div`

`;

const Tag = styled.span`
  display: inline-block;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 19px;
  font-size: 16px;
  color: white;

  &.tag-1 {
  background: #03A9F4;    
  }

  &.tag-2 {
  background: #29B6F6;
  }

  &.tag-3 {
  background: #4FC3F7;
  }

  &.tag-4 {
  background: #81D4FA;
  }

  &.tag-5 {
  background: #B3E5FC;
  }


`;

export { StyledPaper, Content, Tags, Tag };


/* 
const Tags = styled.div`
  margin-top: 10px;
  padding: 20px;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

`;

const Tag = styled.div`
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 14px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    overflow: auto;
    overflow-wrap: break-word;
    line-height: 0.7;
  }

  &.tag-1 {
  width: 100px;
  height: 100px;
  background: #03A9F4;    
  }


  &.tag-2 {
  width: 60px;
  height: 60px;
  background: #29B6F6;
  }

  &.tag-3 {
  width: 60px;
  height: 60px;
  background: #4FC3F7;
  }

  &.tag-4 {
  width: 45px;
  height: 45px;
  background: #81D4FA;
  }

  &.tag-5 {
  width: 30px;
  height: 30px;
  background: #B3E5FC;
  } */