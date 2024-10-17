import Bookmark from "../../models/Bookmark";

export const handler = async (event) => {
    const bookmarkData = JSON.parse(event.body);

    try {
        const newBookmark = new Bookmark(bookmarkData);
        await newBookmark.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newBookmark),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating bookmark', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};