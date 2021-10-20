import { syllable } from "syllable";

const Sizes = [
  [4, "s4", "#FFECC0"],
  [10, "s10", "#FFD0B4"],
  [20, "s20", "#FFC7C8"],
  [30, "s30", "#F2C1DA"],
  [40, "s40", "#D9C9ED"],
  [50, "s50", "#BAE7CE"],
  [70, "s70", "#D7ECBA"],
  [90, "s90", "#B7D4EB"],
];

function getCount(e) {
  return syllable(e);
}

export function getValues(sentence) {
  const count = getCount(sentence);
  var size = Sizes[0][1];
  var color = Sizes[0][2];
  if (count > Sizes.slice(-1)[0][0]) {
    size = "sX";
    color = "#B0C2E3";
  } else {
    for (var i = 0; i < Sizes.length; i++) {
      size = Sizes[i][1];
      color = Sizes[i][2];
      if (count <= Sizes[i][0]) {
        break;
      }
    }
  }
  return { count: count, size: size, color: color };
}
