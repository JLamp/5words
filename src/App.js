import styled from 'styled-components';
import './App.css';
import { useState } from 'react';
import { Layout } from './components/Layout';
import { CreateSentence } from './components/Sentence';
import { Text } from './constants/Text';
import { makeArray } from './helpers/makeArray';

const MainContentArea = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-column-gap: 24px;
height: 100%;
width: 100%;
max-width: 1024px;
overflow: scroll;
@media(max-width: 600px){
  grid-template-columns: unset;
  grid-template-rows: 2fr 1fr;
  grid-row-gap: 16px;
}
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

const defaultText = Text[0].text;
const defaultTextArray = makeArray(defaultText);


function App() {
  const [text, changeText] = useState(defaultTextArray);

  function handleChange({ currentTarget }) {
    const text = makeArray(currentTarget.value)
    changeText(currentTarget.value.length > 0 ? text : defaultTextArray);
  }
  
  return (
    <Layout>
      <MainContentArea>
      <TextInput type="textarea" placeholder={defaultText} name="name" onChange={handleChange}></TextInput>
      <OutputText>{text.map((paragraph, index) => <Paragraph key={index}>{paragraph.map((sentence, index) => CreateSentence(sentence, index, paragraph))}</Paragraph>)}</OutputText>
      </MainContentArea>
    </Layout>
    );
  }
  
  export default App;
  