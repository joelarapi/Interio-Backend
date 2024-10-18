import Post from "../../models/Post";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Post not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post deleted successfully' }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting post', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};