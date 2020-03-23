import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Test} from "./test.entity";

@Injectable()
export class TestService {

    constructor(@InjectRepository(Test) private usersRepository: Repository<Test>) {
    }

    async getUsers(user: Test): Promise<Test[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<Test[]> {
        return await this.usersRepository.find({
            select: ["full_name", "birthday", "is_active"],
            where: [{"id": _id}]
        });
    }

    async createUser(user: Test) {
        this.usersRepository.save(user)
    }

    async updateUser(user: Test) {
        this.usersRepository.save(user)
    }

    async deleteUser(user: Test) {
        this.usersRepository.delete(user);
    }

}
