import { syllable } from "syllable";

export const Sizes = [
  { count: 4, size: "s4", color: "#FFECC0" },
  { count: 10, size: "s10", color: "#FFD0B4" },
  { count: 20, size: "s20", color: "#FFC7C8" },
  { count: 30, size: "s30", color: "#F2C1DA" },
  { count: 40, size: "s40", color: "#D9C9ED" },
  { count: 50, size: "s50", color: "#BAE7CE" },
  { count: 70, size: "s70", color: "#D7ECBA" },
  { count: 90, size: "s90", color: "#B7D4EB" },
  { count: 10000, size: "sX", color: "#B0C2E3" },
];

function getCount(e) {
  return syllable(e);
}

export function getValues(sentence) {
  const count = getCount(sentence);
  var size = "";
  for (var i = 0; i < Sizes.length; i++) {
    if (count <= Sizes[i].count) {
      size = Sizes[i].size;
      break;
    }
  }
  return size;
}
