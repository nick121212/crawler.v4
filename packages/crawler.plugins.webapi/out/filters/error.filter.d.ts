import { ExceptionFilter } from '@nestjs/common';
import { HttpException } from "@nestjs/core";
export declare class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, response: any): void;
}
