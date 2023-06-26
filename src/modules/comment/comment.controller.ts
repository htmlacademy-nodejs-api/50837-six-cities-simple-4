import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { fillDTO } from '../../core/helpers/common.js';
import CommentRdo from './rdo/comment.rdo.js';
import CreateCommentDto from './dto/create-comment.dto';
//import { StatusCodes } from 'http-status-codes';


@injectable()
export default class CommentController extends Controller {
  // constructor(@inject(AppComponent.LoggerInterface) logger: LoggerInterface
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  // public index(req: Request, res: Response): void {
  //   // Код обработчика
  public async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.find();
    //this.ok(res, comments);
    const commentsToResponse = fillDTO(CommentRdo, comments);
    this.ok(res, commentsToResponse);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    // const existComment = await this.commentService.findByCommentText(body.text);

    // if (existComment) {
    //   const errorMessage = `Category with name «${body.text}» exists.`;
    //   this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, {error: errorMessage});
    //   return this.logger.error(errorMessage);
    // }

    const result = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
