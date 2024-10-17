import Post from "../../models/Post";

export const handler = async (event) => {
    try {
        
        const openPosts = await Post.find({ status: 'open' });

        if (openPosts.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No open posts found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(openPosts),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving open posts', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};