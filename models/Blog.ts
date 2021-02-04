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
    mainPhoto: string;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: [true, 'Please add a title'], unique: true },
    intro: { type: String, required: [true, 'Please add an intro'] },
    description: { type: String },
    paragraphs: { type: Array },
    photos: {type: Array },
    order: {type: Array },
    linkUrl: { type: String },
    linkDescription: { type: String },
    mainPhoto: { type: String }
})

const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
export default Blog;
