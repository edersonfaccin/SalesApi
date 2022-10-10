import { Injectable, Inject } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserPartialDto } from './dto/userPartial.dto';
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private authservice: AuthService
  ) {}

  async findAll(): Promise<UserDto[]> {
    try {
      return this.userRepository.find({
        loadRelationIds: false,
        relations: [
          'idcompany'
        ]
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      return await this.userRepository.findOne({ 
        where: { 
          id: id 
        },
        loadRelationIds: false,
        relations: [
          'idcompany'
        ]
      })
    } catch (error) {
      return error;
    }
  }

  async findOneByEmail(idcompany: string, email: string): Promise<UserDto> {
    try {
      return await this.userRepository.createQueryBuilder(`user`)
        .select()
        .andWhere(`email = '${email}'`)
        .andWhere(`idcompany = '${idcompany}'`)
        .printSql()
        .getOne()
    } catch (error) {
      return error;
    }
  }

  async create(data: UserDto): Promise<UserDto> {
    let user = new UserDto()

    try {
      const errors = await validate(data)

      user = data
      user.password = bcrypt.hashSync(data.password, 8)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return this.userRepository.save(user)
      }
    } catch (error) {
      return error;
    }
  }

  async update(oldData: UserDto, newValues: UserPartialDto): Promise<UserDto> {
    const updatedData = oldData;

    try {
      Object.keys(newValues).forEach((key) => {
        if(key == 'password'){
          updatedData[key] = bcrypt.hashSync(updatedData[key], 8)
        }else{
          updatedData[key] = newValues[key];
        }
      });

      const errors = await validate(updatedData)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return await this.userRepository.save(updatedData);
      }
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
   try {
      return await this.userRepository.delete(id);
    } catch (error) {
      return error
    }
  }

  async login(user: UserDto): Promise<string>{
    const resultUser = await this.validateUser(user.idcompany, user.email, user.password)

    if(resultUser){
      return this.authservice.generateJWT(resultUser)
    }else{
      return "Informations incorrectes !";          
    }
  }

  async validateUser(idcompany: string, email: string, password: string): Promise<any | UserDto>{
    const user = await this.findOneByEmail(idcompany, email)

    if(user){
      if(user.active){
        if(await this.authservice.comparePasswords(password, user.password)){
          return user
        }else{
          return null
        }
      }else{
        throw new Error("User inactive");
        
      }
    }else{
      throw new Error("User not found");
    }
  }
}