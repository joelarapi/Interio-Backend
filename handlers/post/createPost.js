import Post from "../../models/Post";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const postData = JSON.parse(event.body);

    try {
        await connectDB();
        const newPost = new Post(postData);
        await newPost.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newPost),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating post', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};