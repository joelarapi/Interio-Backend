import Comment from "../../models/Comment.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const comments = await Comment.find({ postId: id });

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