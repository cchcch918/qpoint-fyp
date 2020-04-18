import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Request, Response} from 'express';
import {ResponseModel} from "./model/response.model";
import {AppConstant} from "./constant/app.constant";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response<ResponseModel>>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                status: AppConstant.STATUS_FAILED,
                statusCode: status,
                path: request.url,
                errorMessage: exception.message || null,
            });
    }
}