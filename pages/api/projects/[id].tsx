import dbConnect from '../../../utils/dbConnect'
import Project from '../../../models/Project'

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case "GET":
            try {
                const project = await Project.findById(id);
                // mock Project.findById
                !project ? res.status(400).json({ success: false }) : res.status(200).json({success: true, data: project})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case "PUT":
            try {
                const project = await Project.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                
                !project ? res.status(400).json({ success: false }) : res.status(200).json({ success: true, data: project })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case "DELETE":
            try {
                const deletedBlog = await Project.deleteOne({ _id: id });

                !deletedBlog ? res.status(400).json({ success: false }) : res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}