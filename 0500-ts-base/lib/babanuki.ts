
export function getRandomIndex(max: number, flag: Record<number, boolean> = {}) {
  let list = [];
  for (let i = 0; i < max; i++) {
    if (!flag[i]) {
      list.push(i);
    }
  }

  let index = Math.floor(Math.random() * list.length);

  return list[index];
}

export type Suit = "spade" | "diamond" | "heart" | "clover" | "joker";

export class Card {
  suit: Suit;
  value: number;

  constructor(suit: Suit, value: number) {
    this.suit = suit;
    this.value = value;
  }

  static spade(value: number) {
    return new Card("spade", value);
  }

  static diamond(value: number) {
    return new Card("diamond", value);
  }

  static heart(value: number) {
    return new Card("heart", value);
  }

  static clover(value: number) {
    return new Card("clover", value);
  }

  static joker() {
    return new Card("joker", 0);
  }

  static prepare() {
    const deck = [];
    for (let i = 1; i <= 13; i++) {
      deck.push(this.spade(i));
      deck.push(this.diamond(i));
      deck.push(this.heart(i));
      deck.push(this.clover(i));
    }
    deck.push(this.joker());

    return deck;
  }

  get isJoker() {
    return this.suit === "joker";
  }

  equal(card: Card) {
    return card.suit === this.suit && card.value === this.value;
  }

  toString() {
    switch (this.suit) {
      case "spade":
        return `♠️ ${this.value}`;
      case "diamond":
        return `♦️ ${this.value}`;
      case "heart":
        return `♥️ ${this.value}`;
      case "clover":
        return `♣️ ${this.value}`;
      case "joker":
        return `JOKER`;
    }
  }
}


export interface IGameMaster {
  logger: ILogger;
  cards: Card[];
  players: IPlayer[];
  rank: IPlayer[];
  turn: number;
  run: () => void;
}

export interface IPlayer {
  name: string;
  hands: Card[];
  done: boolean;
  onlyJoker: boolean;
  discard: () => Card[];
  assign: (card: Card) => void;
  draw: (player: IPlayer) => Card;
}

export interface ILogger {
  firstDiscard: () => void;
  start: () => void;
  end: (loser: IPlayer, rank: IPlayer[]) => void;
  done: (player: IPlayer) => void;
  currentState: (turn: number, player: IPlayer) => void;
  discard: (player: IPlayer, cards: Card[]) => void;
  draw: (from: IPlayer, to: IPlayer, card: Card) => void;
}


export class Logger {
  firstDiscard() {
    console.log("[First Discard]");
  }

  start() {
    console.log("[Game Start]");
  }

  end(loser: IPlayer, rank: IPlayer[]) {
    console.log("[Game End]");
    console.log(loser.name, "Loser");
    console.log("Rank", rank);
  }

  done(player: IPlayer) {
    console.log("[!!!]", player.name, " Done");
  }

  currentState(turn: number, player: IPlayer) {
    console.log(
      turn,
      "[STATE]",
      `${player.name}'s hands`,
      player.hands.map((it) => it.toString()),
    );
  }

  discard(player: IPlayer, cards: Card[]) {
    console.log(`${player.name} discarded ${cards.map((it) => it.toString())}`);
    console.log(
      `${player.name}'s hands after discard`,
      player.hands.map((it) => it.toString()),
      `count: ${player.hands.length}`,
    );
  }

  draw(from: IPlayer, to: IPlayer, card: Card) {
    console.log(
      "[DRAW]",
      `${from.name} drew " ${card.toString()} " from ${to.name}`,
    );
  }
}

