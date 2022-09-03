"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (request.session.role !== 'admin') {
            return false;
        }
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map