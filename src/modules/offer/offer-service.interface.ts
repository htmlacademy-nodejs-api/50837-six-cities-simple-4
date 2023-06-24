import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;
  findOrCreate(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
}
