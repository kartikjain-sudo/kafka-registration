export class SentMailEvent {
  constructor(
    public readonly email: string
  ) {}

  toString(): string {
    return JSON.stringify({
        email: this.email
    });
  }
}