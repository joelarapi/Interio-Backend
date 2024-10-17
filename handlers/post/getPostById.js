import Post from "../../models/Post";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const post = await Post.findById(id).populate('authorId');

        if (!post) {
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
            body: JSON.stringify(post),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving post', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};