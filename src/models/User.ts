import { Model, models, model, Document, Schema } from "mongoose";

import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified?: Date;
  password: string;
  role: string;
  createdAt: Date;
  isModified: (path: string) => boolean;
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser, {}, Methods>(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    emailVerified: {
      type: Date,
      unique: false,
    },
    name: { type: String, required: true, trim: true, unique: false },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);

    next();
  } catch (error) {
    throw error;
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models?.User || model("User", UserSchema);

export default UserModel as Model<IUser, {}, Methods>;
