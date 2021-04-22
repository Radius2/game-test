import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
* {
    margin : 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.color.text};    
}
body {
  background: ${({ theme }) => theme.color.secondary}
}
button {
    padding: 12px 16px;
    font-size: 14px;
    text-transform: uppercase;
    border:none; 
    cursor: pointer;
}
button:active, button:focus {
    outline: none;
    border: none;
}
input:active, input:focus {
    outline: none;
    border: none;
}`;


export const Content = styled.div`
  display: flex;  
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: ${({ maxWidth }) => maxWidth};
`;

export const Row = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: ${({justify})=>justify||'center'};
`;

export const Divider = styled.hr`
  width: 60%;
  border: none;
  height: 1px;
  margin: 0;
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.12);
  margin: 8px auto;
`;