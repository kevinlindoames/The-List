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
exports.OpportunitiesController = void 0;
const common_1 = require("@nestjs/common");
const opportunities_service_1 = require("./opportunities.service");
const filter_opportunity_dto_1 = require("./dto/filter-opportunity.dto");
let OpportunitiesController = class OpportunitiesController {
    opportunitiesService;
    constructor(opportunitiesService) {
        this.opportunitiesService = opportunitiesService;
    }
    findAll(filterDto) {
        return this.opportunitiesService.findAll(filterDto);
    }
    findFollowed(filterDto) {
        return this.opportunitiesService.findFollowed(filterDto);
    }
    toggleFollow(code) {
        return this.opportunitiesService.toggleFollow(code);
    }
};
exports.OpportunitiesController = OpportunitiesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_opportunity_dto_1.FilterOpportunityDto]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('followed'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_opportunity_dto_1.FilterOpportunityDto]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "findFollowed", null);
__decorate([
    (0, common_1.Patch)(':code/follow'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "toggleFollow", null);
exports.OpportunitiesController = OpportunitiesController = __decorate([
    (0, common_1.Controller)('api/opportunities'),
    __metadata("design:paramtypes", [opportunities_service_1.OpportunitiesService])
], OpportunitiesController);
//# sourceMappingURL=opportunities.controller.js.map