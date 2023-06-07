export interface CliCommandInterface {
  readonly name: string;
  execute(...papameters: string[]): void;
}
