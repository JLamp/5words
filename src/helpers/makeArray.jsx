export function splitSentence(e) {
  const arr = e.split(
    /(?<=((?<!Adm|Amb|Brass|Brig|Gen|Br|Cpt|Capt|Chan|Chapln|Cmdr|Cdr|Col|Cpl|Cntss|Dr|Drs|Ens|Fr|Gen|Gov|Lt|2Lt|2dLt|Mlle|Maj|Sgt|Mme|Msgr|Mr|Mrs|Ms|Mx|Pres|Prof|Rep|Revs|Rev|Sgt|Sen|Sr|Hon)\.|!|\?)("|)\s)/
  );
  return arr;
}

export function makeArray(text) {
  var paragraphArray = text.split(/\n+/);
  for (var i = 0; i < paragraphArray.length; i++) {
    paragraphArray[i] = splitSentence(paragraphArray[i]);
    paragraphArray[i] = paragraphArray[i].filter((word) => /[a-z]/i.test(word));
  }
  return paragraphArray;
}
