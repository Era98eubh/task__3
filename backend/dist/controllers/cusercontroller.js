"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCuser = exports.deleteCusers = exports.updateCusers = exports.getCuser = exports.getCusers = exports.createCuser = void 0;
const Cuser_1 = require("../entities/Cuser");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createCuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const cuser = new Cuser_1.Cuser();
        cuser.username = username;
        cuser.password = password;
        cuser.password = yield cuser.encryptPassword(cuser.password);
        const saveduser = yield cuser.save();
        const token = jsonwebtoken_1.default.sign({ id: saveduser.id }, process.env.TOKEN_SECRECT || 'tokentest');
        res.header('auth-token', token).json(saveduser);
    }
    catch (error) {
    }
});
exports.createCuser = createCuser;
const getCusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cusers = yield Cuser_1.Cuser.find();
        res.json(cusers);
    }
    catch (error) {
    }
});
exports.getCusers = getCusers;
const getCuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cuser = yield Cuser_1.Cuser.findOneBy({ id: parseInt(id) });
        res.json(cuser);
    }
    catch (error) {
    }
});
exports.getCuser = getCuser;
const updateCusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield Cuser_1.Cuser.findOneBy({ id: parseInt(req.params.id) });
        if (!user)
            return res.status(404).json({ message: "user does not exists" });
        yield Cuser_1.Cuser.update({ id: parseInt(id) }, req.body);
        return res.json({ message: "Primaryfully updated" });
    }
    catch (error) {
        return res.status(500).json({});
    }
});
exports.updateCusers = updateCusers;
const deleteCusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Cuser_1.Cuser.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "user does not exists" });
        }
        return res.json({ message: "Primaryfully deleted" });
    }
    catch (error) {
        return res.status(500).json({});
    }
});
exports.deleteCusers = deleteCusers;
const loginCuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const cuser = yield Cuser_1.Cuser.findOneBy({ username: username });
        if (!cuser)
            return res.status(400).json('username or password is wrong');
        const correctPassword = yield cuser.validatePassword(password);
        if (!correctPassword)
            return res.status(400).json('invalid password');
        const token = jsonwebtoken_1.default.sign({ id: cuser.id }, process.env.TOKEN_SECRECT || 'tokentest');
        return res.header('auth-token', token).json('login Primaryful');
    }
    catch (error) {
        return res.status(500).json({});
    }
});
exports.loginCuser = loginCuser;
