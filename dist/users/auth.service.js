"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("./users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, userModel) {
        this.usersService = usersService;
        this.userModel = userModel;
    }
    async signup(user) {
        const newUser = new this.userModel({
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
            firstName: user.firstName,
            lastName: user.lastName,
        });
        try {
            await newUser.save();
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Email already exists');
        }
        return newUser;
    }
    async signin(user) {
        const userQ = await this.userModel.findOne({ email: user.email });
        if (!userQ) {
            throw new common_1.NotFoundException('User not found');
        }
        if ((await bcrypt.compare(user.password, userQ.password)) === false) {
            throw new common_1.UnauthorizedException();
        }
        const userR = {
            id: userQ._id,
            email: userQ.email,
            firstName: userQ.firstName,
            lastName: userQ.lastName,
            role: userQ.role,
        };
        return userR;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map