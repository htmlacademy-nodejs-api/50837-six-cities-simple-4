import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CityServiceInterface } from './city-service.interface.js';
import { fillDTO } from '../../core/helpers/common.js';
import CityResponse from './response/city.response.js';
import CreateCityDto from './dto/create-city.dto.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import * as core from 'express-serve-static-core';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';
import OfferResponse from '../offer/response/offer.response.js';
import {RequestQuery} from '../../types/request-query.type.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../core/middlewares/validate-dto.middleware.js';


type ParamsGetCategory = {
  cityId: string;
}

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.CityServiceInterface) private readonly cityService: CityServiceInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCityDto)]
    });
    this.addRoute({
      path: '/:cityId/offers',
      method: HttpMethod.Get,
      handler: this.getOffersFromCity,
      middlewares: [new ValidateObjectIdMiddleware('cityId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const cityResponse = fillDTO(CityResponse, cities);
    this.send(res, StatusCodes.OK, cityResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>,
    res: Response): Promise<void> {

    const existCity = await this.cityService.findByCityName(body.cityName);

    if (existCity) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `City with name «${body.cityName}» exists.`,
        'CityController'
      );
    }

    const result = await this.cityService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(CityResponse, result)
    );
  }

  public async getOffersFromCity(
    {params, query}: Request<core.ParamsDictionary | ParamsGetCategory, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const offers = await this.offerService.findByCity(params.cityId, query.limit);
    this.ok(res, fillDTO(OfferResponse, offers));
  }
}
