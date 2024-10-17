import PaymentTransaction from "../../models/PaymentTransaction";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const transaction = await PaymentTransaction.findById(id);
        if (!transaction) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Payment transaction not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(transaction),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving payment transaction', error }),
        };
    }
};