import z from "zod";
import * as yup from "yup";
import joi from "joi";
import * as valibot from "valibot";
import rype, { CustomValidator } from "rype";

function test(fn: Function) {
  const start = Date.now();
  for (let i = 0; i < 1000000; i++) {
    fn();
  }
  return Date.now() - start;
}

export function check(label: string, fn: Function) {
  const start = Date.now();
  for (let i = 0; i < 1_000_000; i++) fn();
  const end = Date.now();
  const diff = end - start;
  //   console.log(label + ":", diff + "ms");
  return label + ":" + diff;
}

const payload = {
  name: "Arif",
  age: "never mind",
  //   skills: ["Next", "MongoDB", "Fastify"],
  company: "Payhancer",
  year: 2023,
};

const SC_zod = z.object({
  name: z.string(),
  age: z.string(),
  //   skills: z.string().array(),
  company: z.string(),
  year: z.number(),
});
const SC_yup = yup.object({
  name: yup.string(),
  age: yup.string(),
  //   skills: yup.array(yup.string()),
  company: yup.string(),
  year: yup.number(),
});
const SC_joi = joi.object({
  name: joi.string(),
  age: joi.string(),
  //   skills: joi.array().items(joi.string()),
  company: joi.string(),
  year: joi.number(),
});
const SC_rype = rype.object({
  name: rype.string(),
  age: rype.string(),
  //   skills: rype.array(rype.string()),
  company: rype.string(),
  year: rype.number(),
});
const SC_valibot = valibot.object({
  name: valibot.string(),
  age: valibot.string(),
  //   skills: rype.array(rype.string()),
  company: valibot.string(),
  year: valibot.number(),
});

console.log(
  "Yup is - ",
  test(() => SC_yup.validateSync(payload)),
  "ms"
);
console.log(
  "Joi is - ",
  test(() => SC_joi.validate(payload)),
  "ms"
);
console.log(
  "Rype is - ",
  test(() => SC_rype.parse(payload)),
  "ms"
);
console.log(
  "Valibot is - ",
  test(() => SC_valibot.parse(payload)),
  "ms"
);
console.log(
  "Zod is - ",
  test(() => SC_zod.parse(payload)),
  "ms"
);


console.log('hello world')