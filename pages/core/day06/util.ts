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
export const findMarkerEndIndex = (input: string, numberLetters: number) => {
  for (let index = 0; index < input.length - numberLetters; index++) {
    if (isDifferentsLetters(input.substring(index, index + numberLetters))) {
      return index + numberLetters;
    }
  }
};
