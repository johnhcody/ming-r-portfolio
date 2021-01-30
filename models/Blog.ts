import mongoose, { Schema, Document } from 'mongoose';


interface IBlog extends Document {
    title: string;
    intro: string;
    description: string;
    paragraphs: number[];
    photos: number[];
    order: number[];
    linkUrl: string;
    linkDescription: string;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: [true, 'Please add a title'], unique: true },
    intro: { type: String, required: [true, 'Please add an intro'] },
    description: { type: String },
    paragraphs: { type: Array },
    photos: {type: Array },
    order: {type: Array },
    linkUrl: { type: String },
    linkDescription: { type: String }
})

module.exports = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
