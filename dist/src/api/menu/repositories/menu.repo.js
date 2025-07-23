"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRepo = void 0;
const menu_model_1 = __importDefault(require("../../../Models/menu.model"));
const tsyringe_1 = require("tsyringe");
let MenuRepo = class MenuRepo {
    async getAllMenu(category) {
        if (!category) {
            return await menu_model_1.default.find();
        }
        return await menu_model_1.default.find({ category: category });
    }
    async findMenuById(menuId) {
        return await menu_model_1.default.findById(menuId);
    }
    async deleteMenuById(menuId) {
        await menu_model_1.default.findByIdAndDelete(menuId);
    }
    async createMenu(menu) {
        return await menu_model_1.default.create(menu);
    }
    async updateMenu(menuId, menuObject) {
        return await menu_model_1.default.findByIdAndUpdate(menuId, menuObject, { new: true });
    }
};
exports.MenuRepo = MenuRepo;
exports.MenuRepo = MenuRepo = __decorate([
    (0, tsyringe_1.injectable)()
], MenuRepo);
