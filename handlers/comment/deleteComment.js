import Comment from "../../models/Comment";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Comment not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Comment deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting comment', error }),
        };
    }
};