import { OfferEntity } from './offer.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findByOfferId(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId', 'cityId'])
      .exec();
  }

  public async findByTitle(
    title: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ title }).exec();
  }

  public async findOrCreate(
    dto: CreateOfferDto
  ): Promise<DocumentType<OfferEntity>> {
    const existedOffer = await this.findByTitle(dto.title);

    if (existedOffer) {
      return existedOffer;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate(['userId', 'citiId']).exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId', 'citiId'])
      .exec();
  }

  public async findByCity(
    offerId: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({ cities: offerId }, {}, { limit })
      .populate(['userId', 'citiId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: 1,
        },
      })
      .exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return (
      this.offerModel
        .find()
        //.sort({createdAt: SortType.Down})
        .limit(count)
        .populate(['userId', 'citiId'])
        .exec()
    );
  }

  public async findDiscussed(
    count: number
  ): Promise<DocumentType<OfferEntity>[]> {
    return (
      this.offerModel
        .find()
        //.sort({commentCount: SortType.Down})
        .limit(count)
        .populate(['userId', 'citiId'])
        .exec()
    );
  }
}
