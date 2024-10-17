import Comment from "../../models/Comment";

export const handler = async (event) => {
    const { postId } = event.pathParameters;

    try {
        const comments = await Comment.find({ postId }).populate('authorId');

        return {
            statusCode: 200,
            body: JSON.stringify(comments),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving post comments', error }),
        };
    }
};