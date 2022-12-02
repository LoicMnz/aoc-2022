import { sumFunction } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";

enum MyChoice {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}
enum ElfChoice {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}
enum StrategyChoice {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

const parseElfChoice = (s: string) => {
  switch (s) {
    case ElfChoice.Rock:
      return ElfChoice.Rock;
    case ElfChoice.Paper:
      return ElfChoice.Paper;
    case ElfChoice.Scissors:
      return ElfChoice.Scissors;
  }
  throw Error("Choix pour moi invalide " + s);
};
const parseMyChoice = (s: string) => {
  switch (s) {
    case MyChoice.Rock:
      return MyChoice.Rock;
    case MyChoice.Paper:
      return MyChoice.Paper;
    case MyChoice.Scissors:
      return MyChoice.Scissors;
  }
  throw Error("Choix pour elf invalide " + s);
};
const parseStrategyChoice = (s: string) => {
  switch (s) {
    case StrategyChoice.Win:
      return StrategyChoice.Win;
    case StrategyChoice.Lose:
      return StrategyChoice.Lose;
    case StrategyChoice.Draw:
      return StrategyChoice.Draw;
  }
  throw Error("Choix pour stratégie invalide " + s);
};
const makeMyDecision = (e: ElfChoice, s: StrategyChoice) => {
  switch (s) {
    case StrategyChoice.Win:
      switch (e) {
        case ElfChoice.Rock:
          return MyChoice.Paper;
        case ElfChoice.Paper:
          return MyChoice.Scissors;
        case ElfChoice.Scissors:
          return MyChoice.Rock;
      }
    case StrategyChoice.Lose:
      switch (e) {
        case ElfChoice.Rock:
          return MyChoice.Scissors;
        case ElfChoice.Paper:
          return MyChoice.Rock;
        case ElfChoice.Scissors:
          return MyChoice.Paper;
      }
    case StrategyChoice.Draw:
      switch (e) {
        case ElfChoice.Rock:
          return MyChoice.Rock;
        case ElfChoice.Paper:
          return MyChoice.Paper;
        case ElfChoice.Scissors:
          return MyChoice.Scissors;
      }
  }
};

export const calcRoundScore = (m: MyChoice, e: ElfChoice): number => {
  let score = battleScore(m, e) + shapeScore(m);

  return score;
};

export const shapeScore = (m: MyChoice): number => {
  switch (m) {
    case MyChoice.Rock:
      return 1;
    case MyChoice.Paper:
      return 2;
    case MyChoice.Scissors:
      return 3;
  }
};

const battleScore = (m: MyChoice, e: ElfChoice): number => {
  switch (m) {
    case MyChoice.Rock:
      switch (e) {
        case ElfChoice.Rock:
          return 3;
        case ElfChoice.Paper:
          return 0;
        case ElfChoice.Scissors:
          return 6;
      }
    case MyChoice.Paper:
      switch (e) {
        case ElfChoice.Rock:
          return 6;
        case ElfChoice.Paper:
          return 3;
        case ElfChoice.Scissors:
          return 0;
      }
    case MyChoice.Scissors:
      switch (e) {
        case ElfChoice.Rock:
          return 0;
        case ElfChoice.Paper:
          return 6;
        case ElfChoice.Scissors:
          return 3;
      }
  }
};

export const calcScoreTotal = (input: string) => {
  const rounds = input.split(RETOUR_LIGNE).map((ligne) => {
    const choix = ligne.split(" ");
    return { m: parseMyChoice(choix[1]), e: parseElfChoice(choix[0]) };
  });
  return rounds.map((e) => calcRoundScore(e.m, e.e)).reduce(sumFunction);
};

export const calcScoreTotalWithStrategy = (input: string) => {
  const rounds = input.split(RETOUR_LIGNE).map((ligne) => {
    const choix = ligne.split(" ");
    const elfChoice = parseElfChoice(choix[0]);
    const strategy = parseStrategyChoice(choix[1]);

    return { m: makeMyDecision(elfChoice, strategy), e: elfChoice };
  });

  return rounds.map((e) => calcRoundScore(e.m, e.e)).reduce(sumFunction);
};
