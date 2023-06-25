import { DocumentType } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentServiceInterface {
  // create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  // findById(id: string): Promise<DocumentType<CommentEntity> | null>;
  // findOrCreate(commentId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  // find(): Promise<DocumentType<CommentEntity>[]>;
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
