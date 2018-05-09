import styled from 'styled-components';

const Options = styled.div`
    margin-top: 12px;
    display: block;
    width: 100%;
`;

const Option = styled.div`
    display: flex;
    justify-content: space-between;
`;

const OptionsText = styled.span`
    align-self: center;
    color: hsla(0, 0%, 53.3%, .8);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .007px;
    text-transform: uppercase;
`;

export { Options, Option, OptionsText };