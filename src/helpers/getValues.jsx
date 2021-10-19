import { syllable } from "syllable";

const Sizes = [
  [4, "s4", "#FFCA3A"],
  [10, "s10", "#FF730A"],
  [20, "s20", "#FF595E"],
  [30, "s30", "#D44894"],
  [40, "s40", "#9065CA"],
  [50, "s50", "#15B674"],
  [70, "s70", "#8AC926"],
  [90, "s90", "#1982C4"],
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
    color = "#1350AC";
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
