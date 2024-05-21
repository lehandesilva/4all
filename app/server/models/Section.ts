import mongoose, { Document, Schema } from "mongoose";

export interface IBlock extends Document {
  type: string;
  content: string;
  size: number;
  order: number;
}

export interface ISection extends Document {
  id: number;
  name: string;
  blocks: IBlock[];
}

const blockSchema: Schema = new mongoose.Schema({
  type: String,
  content: String,
  size: Number,
  order: Number,
});

const sectionSchema: Schema = new mongoose.Schema({
  id: Number,
  name: String,
  blocks: [blockSchema],
});

const Section = mongoose.model<ISection>("Section", sectionSchema);

export default Section;
