import { defineMongooseModel } from "#nuxt/mongoose";

// import { hash } from 'bcrypt'

export const StudentSchema = defineMongooseModel({
  name: "student",
  schema: {
    matricNumber: { type: "string", unique: true },
    firstName: String,
    lastName: String,
    nationality: String,
    dateOfBirth: Date,
    level: String,
    college: String,
    sex: String,
    religion: String,
    password: String,
  },
  //   hooks(schema) {
  //     schema.pre("save", function (this, next) {
  //       // TODO: better validation
  //       if (this.password && this.matricNumber) next();

  //       throw createError({
  //         statusCode: 500,
  //         statusMessage: "validation failed",
  //       });

  //       // this.password = Math.random().toString,() as any

  //       // bcrypt.genSalt(10, function(err, salt) {
  //       //     if (err) return next(err);

  //       //     bcrypt.hash(user.password, salt, function(err, hash) {
  //       //         if (err) return next(err);
  //       //         user.password = hash;
  //       //         next();
  //       //     })
  //       // })
  //     });
  //   },
});
