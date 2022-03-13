import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entitiy';

export class UserRo {
  data: UserEntity[];
  total: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // 获取用户列表
  async getAllUser(): Promise<UserRo> {
    const data = await getRepository(UserEntity).createQueryBuilder('user');
    const total = await data.getCount();
    const userArr = await data.getMany();
    return { data: userArr, total };
  }
}
