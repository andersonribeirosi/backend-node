import mongoose from 'mongoose';
import { ICompany, ICounter, ICustomer, IItemOrder, IOrder, IUser } from '../model';
export declare const counterSchema: mongoose.Schema<ICounter, mongoose.Model<ICounter, any, any, any, mongoose.Document<unknown, any, ICounter> & ICounter & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICounter, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICounter>> & mongoose.FlatRecord<ICounter> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const userSchema: mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, mongoose.Document<unknown, any, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUser>> & mongoose.FlatRecord<IUser> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const customerSchema: mongoose.Schema<ICustomer, mongoose.Model<ICustomer, any, any, any, mongoose.Document<unknown, any, ICustomer> & ICustomer & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICustomer, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICustomer>> & mongoose.FlatRecord<ICustomer> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
export declare const companySchema: mongoose.Schema<ICompany, mongoose.Model<ICompany, any, any, any, mongoose.Document<unknown, any, ICompany> & ICompany & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICompany, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICompany>> & mongoose.FlatRecord<ICompany> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
export declare const itemOrderSchema: mongoose.Schema<IItemOrder, mongoose.Model<IItemOrder, any, any, any, mongoose.Document<unknown, any, IItemOrder> & IItemOrder & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IItemOrder, mongoose.Document<unknown, {}, mongoose.FlatRecord<IItemOrder>> & mongoose.FlatRecord<IItemOrder> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const orderSchema: mongoose.Schema<IOrder, mongoose.Model<IOrder, any, any, any, mongoose.Document<unknown, any, IOrder> & IOrder & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IOrder, mongoose.Document<unknown, {}, mongoose.FlatRecord<IOrder>> & mongoose.FlatRecord<IOrder> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
export declare const Customer: mongoose.Model<ICustomer, {}, {}, {}, mongoose.Document<unknown, {}, ICustomer> & ICustomer & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>;
export declare const Company: mongoose.Model<ICompany, {}, {}, {}, mongoose.Document<unknown, {}, ICompany> & ICompany & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>;
export declare const Order: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder> & IOrder & {
    _id: mongoose.Types.ObjectId;
}, any>;
export declare const Counter: mongoose.Model<ICounter, {}, {}, {}, mongoose.Document<unknown, {}, ICounter> & ICounter & {
    _id: mongoose.Types.ObjectId;
}, any>;
