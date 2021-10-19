import styled from 'styled-components';
import './App.css';
import { useState } from 'react';
import { Layout } from './components/Layout';
import { CreateSentence } from './components/Sentence';
import { Text } from './constants/Text';
import { makeArray } from './helpers/makeArray';
import { ReactComponent as Clear } from  './components/icons/clear.svg';
import { ReactComponent as Random } from './components/icons/random.svg';

const MainContentArea = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
max-width: 1024px;
`;

const TextContentArea = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-column-gap: 24px;
@media(max-width: 600px){
  grid-template-columns: unset;
  grid-template-rows: 2fr 1fr;
  grid-row-gap: 16px;
}`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 20px;
  align-items: center;
  padding-bottom: 8px;
  position: sticky;
  top: 0px;
  padding-bottom: 0 16px;
  background-color: white;
  color: #62626c;
  padding-left: 2px;
  & svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    fill: #62626c;
  }
  & :hover {
    color: #1f1f22;
    & svg {
      fill: #1f1f22;
    }
  }
`;

const TextInputContainer = styled.div`
width: 100%;
height: 100%;
`;

const TextInput = styled.textarea`
width: 100%;
height: 100%;
display: block;
font-size: 14px;
line-height: 1.5;
`;

const OutputText = styled.div`
overflow: scroll;
& :first-child{
  margin-top: 0;
}
@media(max-width: 600px){
  grid-row: 1;
}
`;

const Paragraph = styled.p`
margin-top: 16px;
margin-bottom: 16px;
line-height: 1.7;
& :first-child{
  margin-left: 0;
}
`;

const Button = styled.button`
  transition: all 400ms;
  padding: 4px 8px;
  background-color: rgba(235, 235, 237, 0);
  border-radius: 4px;
  display: flex;
  align-items: center;
  &:hover{
    background-color: rgb(235, 235, 237, 1);
  }
`;

function App() {
  const [userText, setUserText] = useState(false);
  const [placeholder, setPlaceholder] = useState(0);
  const [text, setText] = useState(Text[0].text);
  const [inputValue, setInputValue] = useState('');
  
  
  
  function handleChange({ currentTarget }) {
    const text = currentTarget.value;
    setInputValue(currentTarget.value);
    setUserText(currentTarget.value.length > 0);
    setText(currentTarget.value.length > 0 ? text : (setPlaceholder(0), Text[0].text));
  }

  function randomText(){
    const ranNum = Math.floor(Math.random() * Text.length);
    setPlaceholder(ranNum);
    setText(Text[ranNum].text);
  }

  function clearText(){
    setInputValue('');
    setUserText(false);
    setText(Text[0].text);
  };

  function handleClick(){
    userText ? clearText() : randomText();
  }

  const ButtonText = userText ? {text: "Your lovely words", icon: <Clear />, button: "Clear"} :  {text: (Text[placeholder].title + " — " + Text[placeholder].author), icon: <Random />, button: "Random" };
  
  return (
    <Layout>
    <MainContentArea>
      <ButtonContainer>
        <span>{ButtonText.text}</span>
      <Button onClick={handleClick}>{ButtonText.icon}<span>{ButtonText.button}</span></Button>
      </ButtonContainer>
      <TextContentArea>
    <TextInputContainer>
    <TextInput type="textarea" placeholder={Text[placeholder].text} value={inputValue} onChange={handleChange}></TextInput>
    </TextInputContainer>
    <OutputText>{makeArray(text).map((paragraph, index) => <Paragraph key={index}>{paragraph.map((sentence, index) => CreateSentence(sentence, index, paragraph))}</Paragraph>)}</OutputText>
    </TextContentArea>
    </MainContentArea>
    </Layout>
    );
  }
  
  export default App;
  