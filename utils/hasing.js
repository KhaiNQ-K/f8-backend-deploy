"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashing = void 0;
const bcrypt = require("bcrypt");
class Hashing {
    static make(password) {
        const saltOfRound = 10;
        const salt = bcrypt.genSaltSync(saltOfRound);
        return bcrypt.hashSync(password, salt);
    }
    static verify(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}
exports.Hashing = Hashing;
//# sourceMappingURL=hasing.js.map