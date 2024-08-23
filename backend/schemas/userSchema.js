const z = require('zod');

const userSignupSchema = z.object({
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    username: z.string().min(3).max(30),
    password: z.string().min(6)
});

const userSigninSchema = z.object({

    username: z.string().max(50).min(1, "Username is required"),
    password: z.string().min(6)

});

const changePasswordSchema = z.object({
    updatedFirstName: z.string().max(50).optional(),
    updatedLastName: z.string().max(50).optional(),
    updatedPassword: z.string().min(6).optional(),
    updatedUsername: z.string().min(6).optional()
})

module.exports ={
    userSignupSchema,
    userSigninSchema,
    changePasswordSchema
}
