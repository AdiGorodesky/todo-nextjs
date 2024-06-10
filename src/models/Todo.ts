import { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  txt: string;
  isDone: boolean;
}

const TodoSchema = new Schema({
  txt: { type: String, unique: true, require: true, trim: true },
  isDone: { type: Boolean },
});
