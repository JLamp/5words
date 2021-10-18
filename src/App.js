import styled from 'styled-components';
import './App.css';
import { useState } from 'react';
import { syllable } from 'syllable';
import { transparentize } from 'polished';

const PageContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
`;

const AppHeader = styled.div`
max-width: 960px;
margin: 24px 0;
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
background: ${({syllables}) => transparentize(.75, getBackgroundColor(syllables))};
opacity: ${({repition}) => 1 - ( repition < 4 ? (.15 * repition) : (.15 * 4))};
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
  
  function count(sentence){
    return syllable(sentence)
  }

  function findSize(sentence){
    var sentenceSize = count(sentence);
    if(sentenceSize < 1){
      sentenceSize = "s0";
    }else if (sentenceSize < 5){
      sentenceSize = "s4";
    } else if (sentenceSize < 11) {
      sentenceSize = "s10";
    } else if (sentenceSize < 21){
      sentenceSize = "s20";
    } else if (sentenceSize < 31){
      sentenceSize = "s30";
    } else if (sentenceSize < 41){
      sentenceSize = "s40"
    } else if (sentenceSize < 51){
      sentenceSize = "s50"
    } else if (sentenceSize < 71){
      sentenceSize = "s70"
    } else if (sentenceSize < 91){
      sentenceSize = "s90"
    } else {
      sentenceSize = "sx";
    }
    return sentenceSize;
  }

  function checkRepition(paragraph, sentence, index){
    const sentenceSize = findSize(sentence);
    var repition = 0;
    for (var i = (index - 1); i > -1; i--){
      console.log(paragraph[i]);
      if (findSize(paragraph[i]) === sentenceSize){
        repition = repition + 1;
      } else {
        break;
      }
    }
    return repition;
  }
  
  function handleChange({ currentTarget }) {
    const text = makeArray(currentTarget.value)
    changeText(currentTarget.value.length > 0 ? text : defaultTextArray);
  }
  
  return (
    <PageContainer>
    <AppHeader>
    <h1>This sentence has 5 words...</h1>
    </AppHeader>
    <MainContentArea>
    <TextInput type="textarea" placeholder={defaultText} name="name" onChange={handleChange}></TextInput>
    <OutputText>{text.map((paragraph, index) => <Paragraph key={index}>{paragraph.map((sentence, index) => <Sentence key={index} repition={checkRepition(paragraph, sentence, index)} syllables={count(sentence)}>{sentence.trim()}</Sentence>)}</Paragraph>)}</OutputText>
    </MainContentArea>
    </PageContainer>
    );
  }
  
  export default App;
  