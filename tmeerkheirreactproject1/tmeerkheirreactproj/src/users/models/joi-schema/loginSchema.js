import Joi from "joi";

const loginSchema = {
  email: Joi.string()
    .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: "Please enter a valid mail" })
    .required(),

  password: Joi.string()
    .ruleset.regex(
      /((?=.*\d{4})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
    )
    .rule({
      message:
        "The password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*-",
    })
    .required(),
};

export default loginSchema;
