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
  cursor: default;
  transition: all 110ms;
  box-sizing: border-box;
  padding: 2px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 2px;
  line-height: 1.5;
  background: ${({ background }) => background};
  // opacity: ${({ repition }) =>
    1 - (repition < 4 ? 0.15 * repition : 0.15 * 4)};
  opacity: ${{}}
  background: ${({ isHoveredProp, singleFragment, background }) =>
    isHoveredProp && !singleFragment && transparentize(0.2, background)};
  border: 1px solid ${({ background }) => background};
  ${({ isHoveredProp, singleFragment, background }) =>
    isHoveredProp && "padding: 4px;" && !singleFragment && background};
  &:hover {
    opacity: 1;
  }
`;

const Fragment = styled.span`
  transition: all 110ms;
  border-radius: 2px;
  background: ${({ isHoveredProp, spaceOnly, background, onlyFragment }) =>
    isHoveredProp && !spaceOnly && !onlyFragment
      ? background
      : transparentize(1, background)};
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
  const [fragmentHovered, setFragmentHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter(x, pindex, sindex) {
    const coord = [pindex, sindex];
    setIsHovered(!x ? coord : false);
  }

  function handleMouseLeave() {
    setFragmentHovered(false);
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
                handleMouseEnter(
                  makeFragments(sentence.trim()).length <= 1,
                  paragraphIndex,
                  sentenceIndex
                )
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
                  fragmentHovered={fragmentHovered}
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
