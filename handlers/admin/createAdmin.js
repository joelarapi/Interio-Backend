import Admin from "../../models/Admin";

export const handler = async (event) => {
    const adminData = JSON.parse(event.body);

    try {
        const newAdmin = new Admin(adminData);
        await newAdmin.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newAdmin),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating admin', error }),
        };
    }
};