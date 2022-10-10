import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async save(hash: string, email: string, idcompany: string){
    let objToken = await this.tokenRepository.findOneBy({ email, idcompany })

    if(objToken){
      this.tokenRepository.update(objToken.id, { 
        hash: hash 
      })
    }else{
      this.tokenRepository.insert({
        hash,
        email,
        idcompany
      })
    }
  }

  async refreshToken(oldToken: string){
    let objToken = await this.tokenRepository.findOneBy({ hash: oldToken })

    if (objToken){
      let user = await this.userService.findOne(objToken.email)      
      return this.authService.login(user)
    }else{
      return new HttpException({
        errorMessage: 'Invalid token'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  async getUsuarioByToken(token: string): Promise<UserDto>{
    token = token.replace("Bearer ","").trim()

    let objToken: Token = await this.tokenRepository.findOneBy({ hash: token })

    if (objToken){
      let user = await this.userService.findOne(objToken.email)      
      return user
    }else{
      return null
    }
  }
}