
export abstract class AbstractHint implements Hint {
  cssClass: string;
  message: string;

  protected constructor(cssClass: string = '', message: string = '') {
    this.cssClass = cssClass;
    this.message = message;
  }
}

export class HintWarning extends AbstractHint {
  constructor(message: string) {
    super('alert-warning', message);
  }
}

export class HintError extends AbstractHint {
  constructor(message: string) {
    super('alert-danger', message);
  }
}

export class HintInfo extends AbstractHint {
  constructor(message: string) {
    super('alert-info', message);
  }
}

export class HintSuccess extends AbstractHint {
  constructor(message: string) {
    super('alert-success', message);
  }
}
