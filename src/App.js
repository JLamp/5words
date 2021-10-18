import styled from 'styled-components';
import './App.css';
import { useState } from 'react';
import { syllable } from 'syllable';
import { transparentize } from 'polished';
import { uuid } from 'uuidv4';

const PageContainer = styled.div`
width: 100%;
height: 100%;
`;

const AppHeader = styled.div`
max-width: 960px;
margin: 24px auto;
`;

const MainContentContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
`;

const MainContentArea = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-column-gap: 24px;
height: 100%;
width: 100%;
max-width: 960px;
`;

const TextInput = styled.textarea`
width: 100%;
height: 100%;
display: block;
font-size: 14px;
line-height: 1.5;
`;

const OutputText = styled.div`
& :first-child{
  margin-top: 0;
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

function getBackgroundColor(syllables){
  if(syllables < 1){
    return "white";
  }else if (syllables < 5){
    return "#FFCA3A";
  } else if (syllables < 11) {
    return "#FF730A";
  } else if (syllables < 21){
    return "#FF595E";
  } else if (syllables < 31){
    return "#D44894";
  } else if (syllables < 41){
    return "#9065CA"
  } else if (syllables < 51){
    return "#15B674"
  } else if (syllables < 71){
    return "#8AC926"
  } else if (syllables < 91){
    return "#1982C4"
  } else {
    return "#1350AC";
  }
}

const Sentence = styled.span`
padding: 2px 2px;
margin-left: 2px;
margin-right: 2px;
border-radius: 2px;
line-height: 1.5;
background: ${({syllables}) => transparentize(.75, getBackgroundColor(syllables))}
`;



function App() {
  
  const defaultText = "This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It’s like a stuck record. The ear demands some variety. \n\nNow listen. I vary the sentence length and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes when I am certain the reader is rested, I will engage them with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo, the roll of the drums, the crash of the cymbals - sounds that say listen to this, it is important. \n\nSo write with a combination of short, medium, and long sentences. Create a sound that pleases the reader’s ear. Don’t just write words. Write music. "

  function makeArray(text){
    const paragraphArray = text.split(/\n+/);
    for (var i = 0; i < paragraphArray.length; i++) {
      paragraphArray[i] = paragraphArray[i].split(/(?<=\.\s|\."|!|\?)/);
    }
    return paragraphArray;
  }

  const defaultTextArray = makeArray(defaultText);
  
  const [text, changeText] = useState(defaultTextArray);
  

  
  function handleChange({ currentTarget }) {
    const text = makeArray(currentTarget.value)
    changeText(currentTarget.value.length > 0 ? text : defaultTextArray);
  }
  
  
  
  return (
    <PageContainer>
    <AppHeader>
    <h1>Rhythm Writing</h1>
    </AppHeader>
    <MainContentContainer>
    <MainContentArea>
    <TextInput type="textarea" placeholder={defaultText} name="name" onChange={handleChange}></TextInput>
    <OutputText>{text.map((paragraph) => <Paragraph key={uuid()}>{paragraph.map((sentence) => <Sentence key={uuid()} syllables={syllable(sentence)}>{sentence.trim()}</Sentence>)}</Paragraph>)}</OutputText>
    </MainContentArea>
    </MainContentContainer>
    </PageContainer>
    );
  }
  
  export default App;
  