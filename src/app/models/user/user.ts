import { ArgsUserTypes } from "../../shared/types";

export class User {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    role?: any[];

    constructor(argsUser: ArgsUserTypes) {
        const { email, firstName, lastName, password, role } = argsUser;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role ? JSON.parse(role) : undefined;
    }
}
