import connectMongo from "@/lib/db";
import UserModel from "@/models/User";

export const getUserByEmail = async (email: string) => {
  try {
    await connectMongo();
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (_id: string) => {
  try {
    await connectMongo();
    const user = await UserModel.findById({ _id });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await connectMongo();
    await UserModel.create({ email, password, name });
  } catch (error) {
    console.log(error);
  }
};
