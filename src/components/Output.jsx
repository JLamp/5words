import styled from "styled-components";
import { transparentize } from "polished";
import { getValues } from "../helpers/getValues";
import { useState } from "react";
import { splitSentences } from "../helpers/makeArray";

const OutputText = styled.div`
  overflow: scroll;
  @media (max-width: 600px) {
    grid-row: 1;
  }
`;

const Paragraph = styled.p`
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
  opacity: ${({ isAnyHovered, isHoveredProp, repition }) =>
    isHoveredProp
      ? 1
      : isAnyHovered
      ? 0.5
      : 1 - (repition < 4 ? 0.1 * repition : 0.1 * 4)};
  background: ${({ isHoveredProp, singleFragment, size, theme }) =>
    isHoveredProp && !singleFragment
      ? transparentize(0.6, theme.size[size])
      : theme.size[size]};
  border: 1px solid ${({ theme, size }) => theme.size[size]};
  &:hover {
    transform: scale(2);
  }
`;

const Fragment = styled.span`
  transition: all 110ms;
  border-radius: 2px;
  background: ${({ isHoveredProp, spaceOnly, onlyFragment, size, theme }) =>
    isHoveredProp && !spaceOnly && !onlyFragment
      ? theme.size[size]
      : transparentize(1, theme.size[size])};
`;

function checkRepition(paragraph, sentenceSize, index) {
  var repition = 0;
  for (var i = index - 1; i > -1; i--) {
    if (getValues(paragraph[i]) === sentenceSize) {
      repition = repition + 1;
    } else {
      break;
    }
  }
  return repition;
}

function checkIfPoetry(paragraph) {
  const lastSentence = paragraph.slice(-1).toString().trim();
  const lastCharacter = lastSentence[lastSentence.length - 1];
  return lastCharacter !== ".";
}

export function Output(text) {
  const [anyHovered, setAnyHovered] = useState(false);
  const [fragmentHovered, setFragmentHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter(x, pindex, sindex) {
    const coord = [pindex, sindex];
    setIsHovered(coord);
    setAnyHovered(true);
  }

  function handleMouseLeave() {
    setFragmentHovered(false);
    setIsHovered(false);
    setAnyHovered(false);
  }

  function checkIfHovered(pindex, sindex) {
    return isHovered[0] === pindex && isHovered[1] === sindex;
  }

  function checkIfAnyHovered() {
    return anyHovered;
  }

  return (
    <OutputText>
      {splitSentences(text.text).map((paragraph, paragraphIndex) => (
        <Paragraph
          key={paragraphIndex}
          poetry={checkIfPoetry(paragraph)}
          onMouseLeave={handleMouseLeave}
        >
          {paragraph.map(
            (sentence, sentenceIndex) =>
              sentence[0].length > 0 && (
                <Sentence
                  key={sentenceIndex}
                  repition={checkRepition(
                    paragraph,
                    getValues(sentence),
                    sentenceIndex
                  )}
                  size={getValues(sentence)}
                  onMouseEnter={() =>
                    handleMouseEnter(false, paragraphIndex, sentenceIndex)
                  }
                  isHoveredProp={checkIfHovered(paragraphIndex, sentenceIndex)}
                  singleFragment={sentence.length <= 1}
                  isAnyHovered={checkIfAnyHovered()}
                >
                  {sentence.map((fragment, index) => (
                    <>
                      <Fragment
                        key={[index, 0]}
                        isHoveredProp={checkIfHovered(
                          paragraphIndex,
                          sentenceIndex
                        )}
                        spaceOnly={fragment === " " ? true : false}
                        size={getValues(fragment)}
                        onlyFragment={sentence.length <= 1}
                        fragmentHovered={fragmentHovered}
                      >
                        {fragment.trim()}
                      </Fragment>
                      {index + 1 !== sentence.length ? (
                        <span key={[index, 1]}> </span>
                      ) : null}
                    </>
                  ))}
                </Sentence>
              )
          )}
        </Paragraph>
      ))}
    </OutputText>
  );
}
