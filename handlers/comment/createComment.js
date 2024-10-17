import Comment from "../../models/Comment";

export const handler = async (event) => {
    const commentData = JSON.parse(event.body);

    try {
        const newComment = new Comment(commentData);
        await newComment.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newComment),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating comment', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};