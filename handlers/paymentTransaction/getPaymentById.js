import PaymentTransaction from "../../models/PaymentTransaction";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const transaction = await PaymentTransaction.findById(id);
        if (!transaction) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Payment transaction not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(transaction),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving payment transaction', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};