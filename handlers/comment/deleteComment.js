import Comment from "../../models/Comment.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
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
            body: JSON.stringify({ message: 'Comment deleted successfully' }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting comment', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};