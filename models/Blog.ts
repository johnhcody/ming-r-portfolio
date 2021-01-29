import mongoose, { Schema, Document } from 'mongoose';


interface IBlog extends Document {
    title: string;
    intro: string;
    description: string;
    paragraphs: number[];
    photos: number[];
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: [true, 'Please add a title'], unique: true },
    intro: { type: String, required: [true, 'Please add an intro'] },
    description: { type: String },
    paragraphs: { type: Array },
    photos: {type: Array }
})

module.exports = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
