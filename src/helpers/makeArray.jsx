//To-Do: remove titles

export function makeArray(input) {
  const sentenceMarker = "___";
  const fragmentMarker = "***";
  const getParagraphs = (input) => input.split(/\n+/g);

  const markSentences = (input) => {
    const chars = [
      [".", /\.\s/g],
      ["!", /!\s/g],
      ["‽", /‽\s/g],
      ["?", /\?\s/g],
      ['."', /\."\s/g],
      ['!"', /!"\s/g],
      ['‽"', /‽"\s/g],
      ['?"', /\?"\s/g],
    ];
    return chars.reduce((memo, [char, pattern]) => {
      return memo.replace(pattern, `${char}${sentenceMarker}`);
    }, input);
  };

  const markFragments = (input) => {
    const chars = [
      [",", /,/g],
      [";", /;/g],
      [" -", /\s-/g],
    ];
    return chars.reduce((memo, [char, pattern]) => {
      return memo.replace(pattern, `${char}${fragmentMarker}`);
    }, input);
  };

  const splitSentences = (paragraphs) =>
    paragraphs.map((paragraph) =>
      paragraph
        .split(sentenceMarker)
        .map((sentence) => sentence.split(fragmentMarker))
    );

  const sanitizeText = (input) => {
    const titles = [
      "Adm",
      "Amb",
      "Brass",
      "Brig",
      "Gen",
      "Br",
      "Cpt",
      "Capt",
      "Chan",
      "Chapln",
      "Cmdr",
      "Cdr",
      "Col",
      "Cpl",
      "Cntss",
      "Dr",
      "Drs",
      "Ens",
      "Fr",
      "Gen",
      "Gov",
      "Lt",
      "2Lt",
      "2dLt",
      "Mlle",
      "Maj",
      "Sgt",
      "Mme",
      "Msgr",
      "Mr",
      "Mrs",
      "Ms",
      "Mx",
      "Pres",
      "Prof",
      "Rep",
      "Revs",
      "Rev",
      "Sgt",
      "Sen",
      "Sr",
      "Hon",
    ];
    const sanitizedText = titles.reduce(
      (memo, title) =>
        memo.replace(
          new RegExp(title + "\\." + sentenceMarker, "g"),
          title + ". "
        ),
      input
    );
    return sanitizedText;
  };

  const process = (input) => {
    const markedInput = sanitizeText(markSentences(markFragments(input)));
    const paragraphs = getParagraphs(markedInput);
    return splitSentences(paragraphs);
  };
  console.log(process(input));
  return process(input);
}
