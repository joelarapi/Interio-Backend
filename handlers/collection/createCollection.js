import Collection from "../../models/Collection";

export const handler = async (event) => {
    const collectionData = JSON.parse(event.body);

    try {
        const newCollection = new Collection(collectionData);
        await newCollection.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newCollection),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating collection', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};