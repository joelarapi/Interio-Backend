import Comment from "../../models/Comment";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Comment not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(comment),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving comment', error }),
        };
    }
};