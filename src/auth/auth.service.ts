import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private tokenService: TokenService
    ) {}

    async validateUser(idcompany: string, email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(idcompany, email)
        if(user && bcrypt.compareSync(password, user.password)){
            if(user.active){
                const { password, ...result } = user
                
                return result
            }else{
                return null
            }
        }
        return null
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, idcompany: user.idcompany };
        const token = this.jwtService.sign(payload)

        this.tokenService.save(token, user.email, user.idcompany)

        return {
          access_token: token
        };
    }

    async loginToken(token: string) {
        let usuario: UserDto = await this.tokenService.getUsuarioByToken(token)
        if (usuario){
            return this.login(usuario)
        }else{
            return new HttpException({
                errorMessage: 'Invalid Token'
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}
