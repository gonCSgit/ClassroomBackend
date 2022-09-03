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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSchema = exports.Class = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Class = class Class {
};
__decorate([
    (0, mongoose_1.Prop)({ maxlength: 24, default: '' }),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '', required: true }),
    __metadata("design:type", String)
], Class.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.SchemaTypes.Date }),
    __metadata("design:type", String)
], Class.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
        default: 0,
    }),
    __metadata("design:type", Number)
], Class.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: 'StudentAttendance',
        },
    ]),
    __metadata("design:type", Array)
], Class.prototype, "studentAttendance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Class.prototype, "teacher", void 0);
Class = __decorate([
    (0, mongoose_1.Schema)()
], Class);
exports.Class = Class;
exports.ClassSchema = mongoose_1.SchemaFactory.createForClass(Class);
//# sourceMappingURL=class.schema.js.map