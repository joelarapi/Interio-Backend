import Bookmark from "../../models/Bookmark";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(id);
        if (!deletedBookmark) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Bookmark not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Bookmark deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting bookmark', error }),
        };
    }
};