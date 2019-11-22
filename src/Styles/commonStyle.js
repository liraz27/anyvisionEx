import styled from 'styled-components';

export const MainLayout = styled.div`
    text-align: center;
    font-family: cursive;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

export const Input = styled.input`
background-color: #282c34;
border: none;
border-bottom: ${props => props.redline ? '2px solid red' : '2px solid white'}
outline: none;
font-size: 25px;
color: white;
`;

export const ConfirmButton = styled.div`
    margin-top: 50px;
`;

export const ButtonText = styled.span`
cursor: pointer;
&:hover {
    color: #09d3ac;
}
`;

export const ErrorMsg = styled.div`
font-size: 14px;
color: red;
`;
