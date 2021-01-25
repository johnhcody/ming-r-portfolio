import mongoose, { Schema, Document } from 'mongoose';


interface IArticle extends Document {
    title: string;
    intro: string;
    img: string;
    link: string;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: [true, 'Please add a title'], unique: true },
    intro: { type: String, required: [true, 'Please add an intro'] },
    description: { type: String, required: [true, 'Please add an intro'] },
    img: { type: String },
    link: { type: String, required: [true, 'Please link to the article'] }
})

module.exports = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)
