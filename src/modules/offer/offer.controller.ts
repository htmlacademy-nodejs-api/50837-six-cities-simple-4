import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { fillDTO } from '../../core/helpers/common.js';
import OfferRdo from './rdo/offer.rdo.js';
import CreateOfferDto from './dto/create-offer.dto';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class OfferController extends Controller {
  // constructor(@inject(AppComponent.LoggerInterface) logger: LoggerInterface
  constructor(
    @inject(AppComponent.LoggerInterface)
    protected readonly logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  // public index(req: Request, res: Response): void {
  //   // Код обработчика
  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    //this.ok(res, offers);
    const offersToResponse = fillDTO(OfferRdo, offers);
    this.ok(res, offersToResponse);
  }

  //public create(req: Request, res: Response): void {
  //public create(_req: Request, _res: Response): void {
  // Код обработчика
  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ): Promise<void> {
    const existCategory = await this.offerService.findByTitle(
      body.title
    );

    if (existCategory) {
      const errorMessage = `Offer with name «${body.title}» exists.`;
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, { error: errorMessage });
      return this.logger.error(errorMessage);
    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }
}
