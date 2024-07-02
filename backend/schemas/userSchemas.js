const { z } = require("zod");

// Zod Schema
const userSignUpSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  username: z.string().max(30),
  email: z.string().email(),
  password: z.string(),
});

const userLoginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

module.exports = {
  userSignUpSchema,
  userLoginSchema,
};
