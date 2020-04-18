import {HttpException, HttpStatus, Injectable,} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TestEntity} from "./test.entity";
import {ResponseModel} from "../utils/model/response.model";
import {AppConstant} from "../utils/constant/app.constant";
import {CreateTestDto, TestDto} from "./test.dto";

@Injectable()
export class TestService {

    constructor(@InjectRepository(TestEntity) private testRepository: Repository<TestEntity>) {
    }

    async getUsers(): Promise<TestEntity[]> {
        return await this.testRepository.find();
    }

    async getUser(id: number): Promise<TestEntity> {
        console.log('iddddddddddddddddd', id);
        const test = await this.testRepository.findOne({
            select: ["fullName", "birthday", "isActive"],
            where: [{"testId": id}]
        });
        if (!test) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        return test;
    }

    async createUser(test: CreateTestDto) {
        const testEntity: TestEntity = {
            "fullName": test.fullName,
            "birthday": test.birthday,
            "isActive": test.isActive,
        };
        await this.testRepository.save(testEntity)
    }

    async updateUser(user: TestDto) {
        const test = await this.testRepository.findOne({
            where: [{"testId": user.id}]
        });
        if (!test) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        await this.testRepository.save(user);
    }

    async deleteUser(id: number) {
        const test = await this.testRepository.findOne({
            where: [{"testId": id}]
        });
        if (!test) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        await this.testRepository.delete(id);
    }

    async deleteUserWithId(id: number) {
        const test = await this.testRepository.findOne({
            where: [{"testId": id}]
        });
        if (!test) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        await this.testRepository.delete(id);
        const responseBody: ResponseModel = {
            status: AppConstant.STATUS_SUCCESS,
            data: "User has been deleted"
        };
        return responseBody;
    }

}
