import styled from 'styled-components';
import { useState } from 'react';
import { Layout } from './components/Layout';
import { Output } from './components/Output';
import { Text } from './constants/Text';
import { ReactComponent as Clear } from  './components/icons/times-solid.svg';
import { ReactComponent as Random } from './components/icons/random-solid.svg';
import {ReactComponent as CaretRight } from './components/icons/angle-right.svg';

const MainContentArea = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 100%;
  grid-column-gap: 24px;
  overflow: hidden;
  @media(${({theme}) => theme.breakpoint}){
    transition: all 1s;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr auto ${({isCollapsed}) => isCollapsed ? 0 : "1fr"};
    overflow-x: hidden;
  }
`;

const ButtonContainer = styled.div`
font-weight: 500;
grid-column: span 2;
justify-content: space-between;
display: flex;
font-size: 14px;
line-height: 20px;
align-items: center;
padding: 8px 0;
padding-bottom: 0 16px;
background-color: ${({theme}) => theme.background};
color: ${({theme}) => theme.textColor.light};
padding-left: 2px;
@media(${({theme}) => theme.breakpoint}){
  grid-column: span 1;
  font-size: 12px;
  text-align: center;
}
`;

const TextInputContainer = styled.div`
width: 100%;
height: 100%;
`;

const TextInput = styled.textarea`
font-family: 'Courier', monospace;
width: 100%;
height: 100%;
display: block;
font-size: 14px;
line-height: 1.5;
background: ${({theme}) => theme.background};
color: ${({theme}) => theme.textColor.title};
&::placeholder{
  color: ${({theme}) => theme.textColor.light};

}
@media(${({theme}) => theme.breakpoint}){
  font-size: 14px;
}
`;

const Button = styled.button`
transition: all 320ms;
padding: 8px;
background-color: rgba(235, 235, 237, 0);
border-radius: 4px;
display: flex;
align-items: center;
&:hover, :focus{
  color: ${({theme}) => theme.textColor.title};
  background-color: rgb(235, 235, 237, 1);
}
@media(${({theme}) => theme.breakpoint}){
  &:hover, :focus{
    background-color: none;
  }
}
& svg {
  width: 16px;
  height: 16px;
  fill: #62626c;
}
& :hover {
  & svg {
    fill: #1f1f22;
  }
}
`;

const CollapseButton = styled(Button)`
display: none;
@media(${({theme}) => theme.breakpoint}){
  display: flex;
  & svg {
    transition: all 320ms;
    transform: rotate(${({isCollapsed}) => isCollapsed ? "90deg" : 0});
  }
}
`;

function App() {
  const [userText, setUserText] = useState(false);
  const [placeholder, setPlaceholder] = useState(0);
  const [currentInput, setCurrentInput] = useState(Text[0].text);
  const [inputValue, setInputValue] = useState('');
  const [textAreaCollapsed, setTextAreaCollapsed] = useState(false);
  
  function handleChange({ currentTarget }) {
    const text = currentTarget.value;
    setInputValue(currentTarget.value);
    setUserText(currentTarget.value.length > 0);
    setCurrentInput(currentTarget.value.length > 0 ? text : (setPlaceholder(0), Text[0].text));
  }
  
  function randomText(){
    var ranNum = Math.floor(Math.random() * Text.length);
    while(ranNum === placeholder){
      ranNum = Math.floor(Math.random() * Text.length)
    }
    setPlaceholder(ranNum);
    setCurrentInput(Text[ranNum].text);
  }
  
  function clearText(){
    setInputValue('');
    setUserText(false);
    setCurrentInput(Text[0].text);
  };
  
  function handleClick(){
    userText ? clearText() : randomText();
  }

  function handleCollapse(){
    const currentState = textAreaCollapsed;
    setTextAreaCollapsed(!currentState);
  }
  
  const ButtonText = userText ? {text: "Your lovely words", icon: <Clear />, button: "Clear"} :  {text: (Text[placeholder].title + " — " + Text[placeholder].author), icon: <Random />, button: "Random" };
  
  return (
    <Layout>
    <MainContentArea isCollapsed={textAreaCollapsed}>
    <ButtonContainer>
    <CollapseButton onClick={handleCollapse} isCollapsed={textAreaCollapsed}><CaretRight /></CollapseButton>
    <span>{ButtonText.text}</span>
    <Button onClick={handleClick} style={{alignSelf: "flex-end"}}>{ButtonText.icon}</Button>
    </ButtonContainer>
    <TextInputContainer>
    <TextInput type="textarea" placeholder={Text[placeholder].text} value={inputValue} onChange={handleChange}>OVERIDE VALUE</TextInput>
    </TextInputContainer>
    <Output text={currentInput}/>
    </MainContentArea>
    </Layout>
    
    );
  }
  
  
  
  export default App;
  