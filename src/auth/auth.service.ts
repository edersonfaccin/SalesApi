import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    generateJWT(user: any): any {
        const payload = { email: user.email, sub: user.id, idcompany: user.idcompany };
        const token = this.jwtService.sign(payload)

        return {
            access_token: token
        };
    }

    hashPassword(password: string): string{
        return bcrypt.hashSync(password, 12)
    }

    async comparePasswords(newPassword: string, passwordHash: string): Promise<boolean>{
        return await bcrypt.compare(newPassword, passwordHash);
    }
}
