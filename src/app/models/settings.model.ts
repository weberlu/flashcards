import { Language } from '../enums/language.enum';

export class Settings {
  language: Language;
  inquiryQuantity: number;

  constructor(language: Language = Language.GERMAN, inquiryQuantity: number = 10) {
    this.language = language;
    this.inquiryQuantity = inquiryQuantity;
  }
}
