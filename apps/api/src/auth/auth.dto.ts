export class SignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export class SignInDto {
    email: string;
    password: string;
}
