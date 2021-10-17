import styled from 'styled-components';
import './App.css';
import { useState } from 'react';
import { syllable } from 'syllable';
import { transparentize } from 'polished';

const TextInput = styled.input`
  width: 400px;
  height: 200px;
`;

const OutputText = styled.div`
padding-top: 24px;
line-height: 1.5;
margin: 0 48px;
`;

function getBackgroundColor(e){
  if (e < 4){
    return "#f3722c";
  } else if(e < 7) {
    return "#f9c74f";
  } else if (e < 15) {
    return "#90be6d";
  } else {
    return "#43aa8b";
  }
}

const Sentence = styled.span`
padding: 2px 2px;
margin: 0 1px;
border-radius: 2px;
background: ${({syllables}) => transparentize(.5, getBackgroundColor(syllables))}
`;



function App() {

  function splitOnPuncuation(e){
    return e.split(/(?<=\.)/);
  } 

  const defaultText = "This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It’s like a stuck record. The ear demands some variety. Now listen. I vary the sentence length and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes when I am certain the reader is rested, I will engage them with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo, the roll of the drums, the crash of the cymbals - sounds that say listen to this, it is important. So write with a combination of short, medium, and long sentences. Create a sound that pleases the reader’s ear. Don’t just write words. Write music."
  const defaultTextArray = splitOnPuncuation(defaultText);

  const [text, changeText] = useState(defaultTextArray);

  function handleChange({ currentTarget }) {
    const text = currentTarget.value;
    const textArray = text.length > 0 ? splitOnPuncuation(text) : defaultTextArray;
    changeText(textArray);
  }

  function countWords(e){
    return e.split(' ').length;
  }

  return (
    <>
    <h1>Rhythm Writing</h1>
    <TextInput type="textarea" name="name" onChange={handleChange}/>
    <OutputText>{text.map((sentence) => <Sentence key={text.indexOf(sentence)} syllables={syllable(sentence)}>{sentence.trim()}</Sentence>)}</OutputText>
    </>
  );
}

export default App;
