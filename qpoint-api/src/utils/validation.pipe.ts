import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from 'class-validator';
import {extname} from "path";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (value instanceof Object && this.isEmpty(value)) {
            throw new HttpException(
                'Validation failed: No body submitted',
                HttpStatus.BAD_REQUEST,
            );
        }
        const {metatype} = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new HttpException(
                `Validation failed: ${this.formatErrors(errors)}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }

    private formatErrors(errors: any[]) {
        return errors
            .map(err => {
                for (const property in err.constraints) {
                    return err.constraints[property];
                }
            })
            .join(', ');
    }

    private isEmpty(value: any) {
        if (Object.keys(value).length > 0) {
            return false;
        }
        return true;
    }
}

export const editFileName = (req, file, callback) => {
    const student = JSON.parse(req.body.student)
    const fileExtName = extname(file.originalname);
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const fileName = `${student.studentId}-${student.fullName}-${year}${month}${day}${fileExtName}`
    callback(null, fileName);
};

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new HttpException(
            `Only image files are allowed`,
            HttpStatus.BAD_REQUEST,
        ), false);
    }
    callback(null, true);
};