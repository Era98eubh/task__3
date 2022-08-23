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
exports.Nuser = void 0;
const typeorm_1 = require("typeorm");
const Issue_1 = require("./Issue");
const Notification_1 = require("./Notification");
let Nuser = class Nuser extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Nuser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nuser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nuser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notification_1.Notification, (notification) => notification.nuser),
    __metadata("design:type", Array)
], Nuser.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Issue_1.Issue, (issue) => issue.nuser),
    __metadata("design:type", Array)
], Nuser.prototype, "issues", void 0);
Nuser = __decorate([
    (0, typeorm_1.Entity)()
], Nuser);
exports.Nuser = Nuser;
//# sourceMappingURL=Nuser.js.map