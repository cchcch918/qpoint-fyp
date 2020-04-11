import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {StaffEntity} from "./staff.entity";
import {StaffLoginDto} from "./staff.dto";

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>) {
    }

    async showAll() {
        const users = await this.staffRepository.find();
        return users.map(user => user.toResponseObject());
    }

    async read(username: string) {
        const user = await this.staffRepository.findOne({
            where: {username},
            relations: ['ideas', 'bookmarks'],
        });
        return user.toResponseObject();
    }

    async login(data: StaffLoginDto) {
        const {username, password} = data;
        const user = await this.staffRepository.findOne({where: {username}});
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }

    async register(data: StaffLoginDto) {
        const {username} = data;
        let user = await this.staffRepository.findOne({where: {username}});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.staffRepository.create(data);
        await this.staffRepository.save(user);
        return user.toResponseObject();
    }
}