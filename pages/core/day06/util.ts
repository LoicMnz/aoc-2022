const isDifferentsLetters = (letters: string) => {
  const tab = letters.split("");
  let currentLetter: string | undefined;
  while ((currentLetter = tab.pop())) {
    if (currentLetter && tab.includes(currentLetter)) {
      return false;
    }
  }

  return true;
};
const isDifferentsLettersSet = (letters: string) => {
  const tab = letters.split("");
  const set = new Set(tab);

  return tab.length === set.size;
};
const isDifferentsLettersAcc = (letters: string) => {
  const acc = [] as string[];
  const tab = letters.split("");
  let currentLetter: string | undefined;
  while ((currentLetter = tab.pop())) {
    if (currentLetter && acc.includes(currentLetter)) {
      return false;
    }
    acc.push(currentLetter);
  }

  return true;
};

export const findMarkerEndIndexArrayPop = (
  input: string,
  numberLetters: number
) => {
  console.time("array pop");
  for (let index = 0; index < input.length - numberLetters; index++) {
    if (isDifferentsLetters(input.substring(index, index + numberLetters))) {
      console.timeEnd("array pop");
      return index + numberLetters;
    }
  }
};
export const findMarkerEndIndexArraySet = (
  input: string,
  numberLetters: number
) => {
  console.time("array set");
  for (let index = 0; index < input.length - numberLetters; index++) {
    if (isDifferentsLettersSet(input.substring(index, index + numberLetters))) {
      console.timeEnd("array set");
      return index + numberLetters;
    }
  }
};
export const findMarkerEndIndexArrayAcc = (
  input: string,
  numberLetters: number
) => {
  console.time("array acc");
  for (let index = 0; index < input.length - numberLetters; index++) {
    if (isDifferentsLettersAcc(input.substring(index, index + numberLetters))) {
      console.timeEnd("array acc");
      return index + numberLetters;
    }
  }
};
