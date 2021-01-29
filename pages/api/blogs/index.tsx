import dbConnect from '../../../utils/dbConnect'
import Blog from '../../../models/Blog'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const blogs = await Blog.find({});

                res.status(200).json({success: true, data: blogs})
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const article = await Blog.create(req.body);

                res.status(201).json({ success: true, data: article })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}