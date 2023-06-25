import { Comment } from '../../types/OfferType.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  }
})
export class CommentEntity extends defaultClasses.TimeStamps implements Comment {
  @prop({ required: true, trim: true })
  public text!: string;

  @prop({ default: 0 })
  public commentRating = 0;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  constructor(commentData: Comment) {
    super();

    this.text = commentData.text;
    this.commentRating = commentData.commentRating;
  }
}

export const CommentModel = getModelForClass(CommentEntity);
