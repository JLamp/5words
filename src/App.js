import styled from 'styled-components';
import { useState } from 'react';
import { Layout } from './components/Layout';
import { Output } from './components/Output';
import { Text } from './constants/Text';
import { ReactComponent as Clear } from  './components/icons/clear.svg';
import { ReactComponent as Random } from './components/icons/random.svg';

const MainContentArea = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
max-width: 1024px;
align-self: stretch;
overflow: auto;
margin: 0 auto;
`;

const TextContentArea = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-column-gap: 24px;
@media(max-width: 600px){
  grid-template-columns: unset;
  grid-template-rows: 2fr 1fr;
  grid-row-gap: 16px;
}
& > {
  overflow: scroll;
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
background-color: ${({theme}) => theme.background};
color: ${({theme}) => theme.textColor.light};
padding-left: 2px;
z-index: 1000;
& svg {
  width: 12px;
  height: 12px;
  margin-right: 4px;
  fill: #62626c;
}
& :hover {
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
background: ${({theme}) => theme.background};
color: ${({theme}) => theme.textColor.title};
&::placeholder{
  color: ${({theme}) => theme.textColor.light}
}
`;

const Button = styled.button`
transition: all 400ms;
padding: 4px 8px;
background-color: rgba(235, 235, 237, 0);
border-radius: 4px;
display: flex;
align-items: center;
&:hover, :focus{
  color: ${({theme}) => theme.textColor.title};
  background-color: rgb(235, 235, 237, 1);
}
`;

function App() {
  const [userText, setUserText] = useState(false);
  const [placeholder, setPlaceholder] = useState(0);
  const [currentInput, setCurrentInput] = useState(Text[0].text);
  const [inputValue, setInputValue] = useState('');
  
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

  // New Split Sentences
  function splitSentences(input) {
    const sentenceMarker = "___";
    const getParagraphs = (input) => input.split("\n\n");
  
    const markSentences = (input) => {
      const chars = [
        [".", /\./g],
        ["!", /!/g],
        ["‽", /‽/g],
        ["?", /\?/g],
      ];
      return chars.reduce((memo, [char, pattern]) => {
        return memo.replace(pattern, `${char}${sentenceMarker}`);
      }, input);
    };
  
    const splitSentences = (paragraphs) =>
      paragraphs.map((paragraph) => paragraph.split(sentenceMarker));
  
    const process = (input) => {
      const markedInput = markSentences(input);
      const paragraphs = getParagraphs(markedInput);
      return splitSentences(paragraphs);
    };
    return process(input);
  }

  console.log(splitSentences(Text[0].text));
  
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
    <TextInput type="textarea" placeholder={Text[placeholder].text} value={inputValue} onChange={handleChange}>OVERIDE VALUE</TextInput>
    </TextInputContainer>
    <Output text={currentInput}/>
    </TextContentArea>
    </MainContentArea>
    </Layout>
    
    );
  }
  
  
  
  export default App;
  