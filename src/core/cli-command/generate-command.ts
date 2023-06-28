import got from 'got';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import OfferGenerator from '../../modules/offer-generator/offer-generator.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockType } from '../../types/MockType.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockType;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Can't fetch data from ${url}.`);
      return;
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
