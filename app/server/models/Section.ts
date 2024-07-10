import mongoose, { Document, Schema } from "mongoose";

export interface IBlock extends Document {
  type: string;
  content: string;
  style: {
    color: String | null;
    size: Number | null;
    align: String | null;
  };
}

export interface ISection extends Document {
  name: string;
  blocks: IBlock[];
}

const blockSchema: Schema = new mongoose.Schema({
  type: String,
  content: String,
  style: {
    color: String || null,
    size: Number || null,
    align: String || null,
  },
});

const sectionSchema: Schema = new mongoose.Schema({
  name: String,
  blocks: [blockSchema],
});

const Section =
  mongoose.models.Section || mongoose.model<ISection>("Section", sectionSchema);

export default Section;
