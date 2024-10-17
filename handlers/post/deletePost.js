import Post from "../../models/Post";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Post not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting post', error }),
        };
    }
};