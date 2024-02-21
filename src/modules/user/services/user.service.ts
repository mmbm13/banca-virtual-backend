import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { hash } from 'src/shared/utils';
import { QueryUserDto } from '../dto';
import { buildQuery } from 'src/shared/utils/buildQuery';
import { Transaction } from 'src/modules/transaction/schemas';
import { col, fn } from 'sequelize';
import { Status } from 'src/modules/transaction/enums';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hash(createUserDto.password),
    });

    const userJson = user.toJSON();
    delete userJson.password;

    return userJson;
  }

  findAll(queryDto: QueryUserDto) {
    const query = buildQuery(queryDto);
    const countQuery = buildQuery(queryDto, true);
    return Promise.all([
      this.userRepository.findAll({
        ...query,
        subQuery: false,
        attributes: {
          include: [[fn('SUM', col('received.coins')), 'pendingCoins']],
        },
        include: [
          {
            model: Transaction,
            as: 'received',
            attributes: [],
            where: { status: Status.PENDING },
            required: false,
          },
        ],
        group: ['User.id'],
      }),
      this.userRepository.countAll(countQuery),
    ]);
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = hash(updateUserDto.password);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.remove(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findByIdentification(identification: string) {
    return this.userRepository.findByIdentification(identification);
  }
}
