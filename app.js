"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const zod_1 = __importDefault(require("zod"));
const yup = __importStar(require("yup"));
const joi_1 = __importDefault(require("joi"));
const valibot = __importStar(require("valibot"));
const rype_1 = __importDefault(require("rype"));
function test(fn) {
    const start = Date.now();
    for (let i = 0; i < 1000000; i++) {
        fn();
    }
    return Date.now() - start;
}
function check(label, fn) {
    const start = Date.now();
    for (let i = 0; i < 1000000; i++)
        fn();
    const end = Date.now();
    const diff = end - start;
    //   console.log(label + ":", diff + "ms");
    return label + ":" + diff;
}
exports.check = check;
const payload = {
    name: "Arif",
    age: "never mind",
    //   skills: ["Next", "MongoDB", "Fastify"],
    company: "Payhancer",
    year: 2023,
};
const SC_zod = zod_1.default.object({
    name: zod_1.default.string(),
    age: zod_1.default.string(),
    //   skills: z.string().array(),
    company: zod_1.default.string(),
    year: zod_1.default.number(),
});
const SC_yup = yup.object({
    name: yup.string(),
    age: yup.string(),
    //   skills: yup.array(yup.string()),
    company: yup.string(),
    year: yup.number(),
});
const SC_joi = joi_1.default.object({
    name: joi_1.default.string(),
    age: joi_1.default.string(),
    //   skills: joi.array().items(joi.string()),
    company: joi_1.default.string(),
    year: joi_1.default.number(),
});
const SC_rype = rype_1.default.object({
    name: rype_1.default.string(),
    age: rype_1.default.string(),
    //   skills: rype.array(rype.string()),
    company: rype_1.default.string(),
    year: rype_1.default.number(),
});
const SC_valibot = valibot.object({
    name: valibot.string(),
    age: valibot.string(),
    //   skills: rype.array(rype.string()),
    company: valibot.string(),
    year: valibot.number(),
});
console.log("Yup is - ", test(() => SC_yup.validateSync(payload)), "ms");
console.log("Joi is - ", test(() => SC_joi.validate(payload)), "ms");
console.log("Rype is - ", test(() => SC_rype.parse(payload)), "ms");
console.log("Valibot is - ", test(() => SC_valibot.parse(payload)), "ms");
console.log("Zod is - ", test(() => SC_zod.parse(payload)), "ms");
