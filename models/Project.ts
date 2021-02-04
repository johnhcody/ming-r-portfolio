import mongoose, { Schema, Document } from 'mongoose';


interface IProject extends Document {
    title: string;
    intro: string;
    type: string;
    description: string;
    paragraphs: number[];
    photos: number[];
    order: number[];
    linkUrl: string;
    linkDescription: string;
    mainPhoto: string;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: [true, 'Please add a title'], unique: [true, 'You already have a project with that name.'] },
    intro: { type: String },
    type: { type: String },
    description: { type: String },
    paragraphs: { type: Array },
    photos: {type: Array },
    order: {type: Array },
    linkUrl: { type: String },
    linkDescription: { type: String },
    mainPhoto: { type: String }
})

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
export default Project;