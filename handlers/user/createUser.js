import User from "../../models/User";

export const createUser = async (event) => {
    const userData = JSON.parse(event.body);

    try {
        const newUser = new User(userData);
        await newUser.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating user', error }),
        };
    }
};