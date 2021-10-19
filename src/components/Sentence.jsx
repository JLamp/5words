import styled from "styled-components";
import { transparentize } from "polished";
import { getValues } from "../helpers/getValues";

const Sentence = styled.span`
  padding: 2px 2px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 2px;
  line-height: 1.5;
  background: ${({ background }) => transparentize(0.65, background)};
  opacity: ${({ repition }) => 1 - (repition < 4 ? 0.15 * repition : 0.15 * 4)};
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

export function CreateSentence(sentence, index, paragraph) {
  var values = getValues(sentence);
  var repition = checkRepition(paragraph, values.size, index);
  return (
    <Sentence key={index} repition={repition} background={values.color}>
      {sentence.trim()}
    </Sentence>
  );
}
