import styled from 'styled-components';

const Wrapper = styled.div`
    min-height: 69px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Content = styled.div`
    padding: 0px 16px 0 16px;
    display: flex;  
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.div`
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const Logo = styled.img`
    align-self: center;
    margin-right: 4px;
`;

const Options = styled.div`

`;


export {Wrapper, Content, Title, Logo, Options };