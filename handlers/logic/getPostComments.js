import Comment from "../../models/Comment.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { postId } = event.pathParameters;

    try {
        await connectDB();
        const comments = await Comment.find({ postId }).populate('authorId');

        return {
            statusCode: 200,
            body: JSON.stringify(comments),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving post comments', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};