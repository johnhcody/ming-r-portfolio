import dbConnect from '../../../utils/dbConnect'
import Article from '../../../models/Article'

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case "GET":
            try {
                const article = await Article.findById(id);

                !article ? res.status(400).json({ success: false }) : res.status(200).json({success: true, data: article})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case "PUT":
            // Article.findByIdAndUpdate({ _id: "5f85e2e36ef7e00c97ac484f" },  { color: "Green" }, (err, fruit) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log("UPDATED FRUIT!");
            //         console.log(fruit);
            //     }
            // });
            try {
                const article = await Article.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                
                !article ? res.status(400).json({ success: false }) : res.status(200).json({ success: true, data: article })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case "DELETE":
            try {
                const deletedArticle = await Article.deleteOne({ _id: id });

                !deletedArticle ? res.status(400).json({ success: false }) : res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}