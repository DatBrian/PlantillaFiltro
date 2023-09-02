class AutoincrementSchema {
    constructor(database) {
        this.database = database;
        this.entity = "autoincrement";
        this.collection = this.database.collection(this.entity);
    }

    async generateCollection() {
        try {
            await this.database.createCollection(this.entity);
        } catch (error) {
            throw error;
        }
    }

    async createData() {
        try {
            await this.collection.insertOne({
                _id: "rolId",
                sequence_value: 0,
            });
        } catch (error) {
            throw error;
        }
    }

    async increment(entity) {
        const sequenceDoc = await this.collection.findOneAndUpdate(
            { _id: `${entity}Id` },
            { $inc: { secuence_value: 1 } },
            { returnDocument: "after" }
        );
        return sequenceDoc.value.sequence_value;
    }
}
export default AutoincrementSchema;
