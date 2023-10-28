import { Options } from "../model";

export class DataSource {
    static async create<T>({ data, model, options }: { data: T, model: any, options?: Options }) {
        var response
        try {
            const newData = await model.create(data);
            response = await model.findById(newData._id).select(options?.exclude);

            return response
        } catch (error) {
            throw error
        }
    }

    static async read({ model, options }: { model: any, options?: Options }) {
        var response
        try {
            var whereObject = options?.where?.filter != null ? JSON.parse(options?.where?.filter) : {}
            var response = await model.find(whereObject)
                .select(options?.exclude)
                .collation({ locale: "en" }) // insensível a maiúsculas/minúsculas
                .sort(options?.sort)
                .lean()
                .exec();

            return response
        } catch (error) {
            throw error
        }
    }

    static async update<T>({ data, model, options }: { data: T, model: any, options?: Options }) {
        var response: T
        try {
            response = await model.updateOne(options?.where, data)

            return response
        } catch (error) {
            throw error
        }
    }
}