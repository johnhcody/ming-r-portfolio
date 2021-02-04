import mongoose, { Schema, Document } from 'mongoose';


interface IArticle extends Document {
    title: string;
    intro: string;
    description: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
    body5: string;
    mainPhoto: string;
    photo2: string;
    photo3: string;
    photo4: string;
    photo5: string;
    linkUrl: string;
    linkDescription: string;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: [true, 'Please add a title'], unique: true },
    intro: { type: String, required: [true, 'Please add an intro'] },
    description: { type: String },
    body1: {type: String},
    body2: {type: String},
    body3: {type: String},
    body4: {type: String},
    body5: {type: String},
    mainPhoto: {type: String},
    photo2: {type: String},
    photo3: {type: String},
    photo4: {type: String},
    photo5: {type: String},
    linkUrl: { type: String, required: [true, 'Please link to the article'] },
    linkDescription: {type: String}
})

const Article =  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
export default Article
