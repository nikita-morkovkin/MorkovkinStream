import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { VerificationService } from '../verification/verification.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class AccountService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly verificationService: VerificationService,
  ) {}

  public async getCurrentProfile(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        socialLinks: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  public async create(input: CreateUserInput) {
    const { username, email, password } = input;

    const isUsernameExist = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExist) {
      throw new ConflictException('Такое имя пользователя уже занято');
    }

    const isEmailExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Такая почта уже занята');
    }

    const hashedPassword = await hash(password);

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        displayName: username,
      },
    });

    try {
      await this.verificationService.sendVerificationEmail(user);
    } catch (error) {
      console.warn(
        'Failed to send verification email:',
        error instanceof Error ? error.message : String(error),
      );
    }

    return true;
  }

  public async changeEmail(user: User, input: ChangeEmailInput) {
    const { email } = input;

    if (user.email === email) {
      throw new BadRequestException('Новая почта должна отличаться от текущей');
    }

    const isEmailExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Такая почта уже занята');
    }

    // There is no checking email verification due to it is so difficult
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        isEmailVerified: false,
      },
    });

    return true;
  }

  public async changePassword(user: User, input: ChangePasswordInput) {
    const { newPassword, oldPassword } = input;

    if (newPassword === oldPassword) {
      throw new BadRequestException('Новый пароль совпадает со старым');
    }

    const isPasswordValid = await verify(user.password, oldPassword);

    if (!isPasswordValid) {
      throw new BadRequestException('Неверный текущий пароль');
    }

    const newHashedPassword = await hash(newPassword);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: newHashedPassword,
      },
    });

    return true;
  }
}
