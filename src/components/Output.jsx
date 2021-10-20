import styled from "styled-components";
import { transparentize } from "polished";
import { getValues } from "../helpers/getValues";
import { useState } from "react";
import { makeArray } from "../helpers/makeArray";

const OutputText = styled.div`
  overflow: scroll;
  & :first-child {
    margin-top: 0;
  }
  @media (max-width: 600px) {
    grid-row: 1;
  }
`;

const Paragraph = styled.p`
  margin: ${({ poetry }) => (poetry ? "4px" : "16px")} 0;
  line-height: 1.7;
  & :first-child {
    margin-left: 0;
  }
`;

const Sentence = styled.span`
  transition: all 110ms;
  padding: 2px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 2px;
  line-height: 1.5;
  background: ${({ background }) => transparentize(0.65, background)};
  opacity: ${({ repition }) => 1 - (repition < 4 ? 0.15 * repition : 0.15 * 4)};
  background: ${({ isHoveredProp, singleFragment, background }) =>
    isHoveredProp && !singleFragment && transparentize(1, background)};
  border: ${({ isHoveredProp, singleFragment, background }) =>
    isHoveredProp && !singleFragment && "1px solid black"};
  ${({ isHoveredProp, singleFragment, background }) =>
    isHoveredProp &&
    "padding: 4px;" &&
    !singleFragment &&
    transparentize(0, background)};
`;

const Fragment = styled.span`
  // padding: ${({ spaceOnly }) => (!spaceOnly ? "2px" : null)};
  border-radius: 2px;
  background: ${({ isHoveredProp, spaceOnly, background, onlyFragment }) =>
    isHoveredProp && !spaceOnly && !onlyFragment
      ? transparentize(0.65, background)
      : null};
`;

function checkRepition(paragraph, sentenceSize, index) {
  var repition = 0;
  for (var i = index - 1; i > -1; i--) {
    if (getValues(paragraph[i]).size === sentenceSize) {
      repition = repition + 1;
    } else {
      break;
    }
  }
  return repition;
}

function makeFragments(sentence) {
  return sentence.split(/(?<=,|:)(\s)/);
}

function checkIfPoetry(paragraph) {
  const lastSentence = paragraph.slice(-1).toString().trim();
  const lastCharacter = lastSentence[lastSentence.length - 1];
  return lastCharacter !== ".";
}

export function Output(text) {
  const [isHovered, setIsHovered] = useState([0, 0]);

  function handleMouseEnter(pindex, sindex) {
    const coord = [pindex, sindex];
    setIsHovered(coord);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function checkIfHovered(pindex, sindex) {
    return isHovered[0] === pindex && isHovered[1] === sindex;
  }

  return (
    <OutputText>
      {makeArray(text.text).map((paragraph, paragraphIndex) => (
        <Paragraph key={paragraphIndex} poetry={checkIfPoetry(paragraph)}>
          {paragraph.map((sentence, sentenceIndex) => (
            <Sentence
              key={sentenceIndex}
              repition={checkRepition(
                paragraph,
                getValues(sentence).size,
                sentenceIndex
              )}
              background={getValues(sentence).color}
              onMouseEnter={() =>
                handleMouseEnter(paragraphIndex, sentenceIndex)
              }
              onMouseLeave={handleMouseLeave}
              isHoveredProp={checkIfHovered(paragraphIndex, sentenceIndex)}
              singleFragment={makeFragments(sentence.trim()).length <= 1}
            >
              {makeFragments(sentence.trim()).map((fragment, index) => (
                <Fragment
                  key={index}
                  isHoveredProp={checkIfHovered(paragraphIndex, sentenceIndex)}
                  spaceOnly={fragment === " " ? true : false}
                  background={getValues(fragment).color}
                  onlyFragment={makeFragments(sentence.trim()).length <= 1}
                >
                  {fragment}
                </Fragment>
              ))}
            </Sentence>
          ))}
        </Paragraph>
      ))}
    </OutputText>
  );
}
