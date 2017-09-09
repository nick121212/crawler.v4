import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

import { WebsiteService } from './service';
import { DbService } from '../db/db.service';

@Middleware()
export class FindMiddleware implements NestMiddleware {

    /**
     * Only interact with the Employee service via the Service<Interface> to ensure loose coupling
     */

    constructor(private entityService: WebsiteService) {
    }

    public resolve() {
        return async (req, res, next) => {
            if (!req.params.id) {
                throw new HttpException(
                    { error: 'Oops, something went wrong.' },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            const entity = await this.entityService.get(req.params.id);
            if (!entity) {
                throw new HttpException('Entity not found.', 404);
            }
            req.entity = entity;
            next();
        };
    }
}
