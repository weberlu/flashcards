import { Language } from '../enums/language.enum';

export class Expression {
  readonly id: number;
  readonly meaning_de: string;
  readonly meaning_en: string;
  readonly pronunciation_en: string;
  isAnswered?: boolean;
  isKnown?: boolean;

  constructor() {
    this.isAnswered = false;
    this.isKnown = false;
  }

  public getMeaning(language: Language): string {
    const property: string = ['meaning_', language].join('');
    return this[property];
  }

  public getPronunciation(language: Language): string {
    const property: string = ['pronunciation_', language].join('');
    return this[property];
  }

  public setAnswered(isAnswered: boolean): void {
    this.isAnswered = isAnswered;
  }

  public setKnown(isKnown: boolean): void {
    this.isKnown = isKnown;
  }
}
