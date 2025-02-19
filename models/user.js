const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const userSchema = Schema({
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: {
            values: ["starter", "pro", "business"],
        message:
          "{VALUE} is not supported, have to choose between 'starter', 'pro' or 'business' ",
        },
        default: "starter"
    },
     avatarURL: {
      type: String,
      required: true,

    },
    token: {
        type: String,
        default: null,
    },
     verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
},
{ versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    // subscription: Joi.string().valid("starter", "pro", "business"),
    // token: Joi.string()
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    register: registerSchema,
    login: loginSchema,
    updateSubscription: updateSubscriptionSchema,
    verify: verifyEmailSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
};