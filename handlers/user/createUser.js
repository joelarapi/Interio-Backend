import User from "../../models/User";
import connectDB from "../../configurations/connectDB";


export const handler = async (event) => {
    const userData = JSON.parse(event.body);
    console.log(event)

    try {
        await connectDB();
        const newUser = new User(userData);
        await newUser.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating user', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};