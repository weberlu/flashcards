
declare interface Chapter {
  readonly id: number;
  name: string;
  wordCount: number;
  wordTotal: number;
}


declare interface CardBox {
  readonly id: number;
  wordCount: number;
  overflow: number;
}

declare interface Expression {
  readonly id: number;
  meaning_de: string;
  meaning_en: string;
  pronunciation_en?: string;
  isAnswered?: boolean;
  isKnown?: boolean;
}

declare interface Hint {
  message: string;
  cssClass: string;
}
