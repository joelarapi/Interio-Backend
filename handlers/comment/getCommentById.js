import Comment from "../../models/Comment";
import connectDB from "../../configurations/connectDB";


export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const comment = await Comment.findById(id);
        if (!comment) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Comment not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(comment),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving comment', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};