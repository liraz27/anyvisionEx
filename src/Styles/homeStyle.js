import styled from 'styled-components';

export const Title = styled.h1`
    color: #09d3ac;
`;

export const MainButtons = styled.h1`
display: grid;
grid-template-columns: 40% 20% 40%;
grid-template-rows: auto;
grid-template-areas:
 "login . register";
`;

export const Login = styled.div`
grid-area: login;
`;

export const Register = styled.div`
grid-area: register;
`;

export const MainButton = styled.div`
border: 3px white solid;
border-radius: 10px;
padding: 10px;
color: #09d3ac;
width: 20rem;
cursor: pointer;
font-size: 25px;

&:hover {
    box-shadow: 0px 0px 1px 1px white;
}
`