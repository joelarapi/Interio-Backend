import PaymentTransaction from "../../models/PaymentTransaction";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const transactionData = JSON.parse(event.body);

    try {
        await connectDB();
        const newTransaction = new PaymentTransaction(transactionData);
        await newTransaction.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newTransaction),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating payment transaction', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};