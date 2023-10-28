import mongoose, { Schema } from 'mongoose'
import { Validator, isDuplicated, isEmpty } from '../../utils'
import { ICompany, ICounter, ICustomer, IItemOrder, IOrder, IUser } from '../model'

export const counterSchema = new Schema<ICounter>({
    id: {
        type: String,
        required: true
    },
    seq: {
        type: Number
    }
})

export const userSchema = new Schema<IUser>({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageProfile: {
        type: String,
        required: false
    }
})

export const customerSchema = new Schema<ICustomer>({
    id: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    ie: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }
})

export const companySchema = new Schema<ICompany>({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    cnpj: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: false
    }
})

export const itemOrderSchema = new Schema<IItemOrder>({
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    ipi: {
        type: Number
    },
    desc1: {
        type: Number
    },
    desc2: {
        type: Number
    }
})

export const orderSchema = new Schema<IOrder>({
    orderId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        ref: 'userSchema',
    },
    customerId: {
        type: String,
        ref: 'customerSchema'
    },
    companyId: {
        type: String,
        ref: 'companySchema'
    },
    user: {
        type: Object,
        ref: 'userSchema',
    },
    customer: {
        type: Object,
        ref: 'customerSchema',
    },
    company: {
        type: Object,
        ref: 'companySchema',
    },
    annotation: {
        type: String
    },
    paymentCondition: {
        type: String
    },
    shippingCompany: {
        type: String
    },
    items: [itemOrderSchema],
    total: Number,
    closed: {
        type: Boolean,
        default: false
    },
})

orderSchema.pre('save', async function (next) {
    const doc = this;

    next()
});

userSchema.pre('save', { document: true, query: true }, async function (this: any, next) {
    const exceptionToThrow =
        isEmpty(this._doc.name) ?
            Validator.exceptionsMsgs.requiredExceptionUserName :
            isEmpty(this._doc.login) ?
                Validator.exceptionsMsgs.requiredExceptionUserLogin :
                isEmpty(this._doc.password) ?
                    Validator.exceptionsMsgs.requiredExceptionUserPwd :
                    null

    if (exceptionToThrow)
        throw exceptionToThrow
    else
        next()
})

userSchema.post('save', function (error: any, doc: any, next: any) {
    if (!doc.items) {
        throw Error('Nenhum item foi inserido ')
    }

    const exceptionToThrow =
        isEmpty(doc.name) ?
            Validator.exceptionsMsgs.requiredExceptionUserName :
            isEmpty(doc.login) ?
                Validator.exceptionsMsgs.requiredExceptionUserLogin :
                isEmpty(doc.password) ?
                    Validator.exceptionsMsgs.requiredExceptionUserPwd :
                    isDuplicated(error, error?.keyValue?.login) ?
                        Validator.exceptionsMsgs.duplicatedExceptionLogin : null

    if (exceptionToThrow)
        throw exceptionToThrow
    else
        next()
})

orderSchema.post('save', function (error: any, doc: any, next: any) {
})

orderSchema.pre('save', function (next) {
    const order = this as any;

    if (!order?._doc?.items?.length) {
        throw Error('Nenhum item foi inserido');
    }

    if (order) {
        const total = order.items.reduce((acc: any, item: any) => {
            if (item.price && item.quantity) {
                let itemTotal = item.price * item.quantity;

                if (item.ipi) {
                    const ipi = item.ipi / 100;
                    itemTotal += itemTotal * ipi;
                }

                if (item.desc1) {
                    const discountAmount1 = (item.desc1 / 100) * itemTotal;
                    itemTotal -= discountAmount1;
                }

                if (item.desc2) {
                    const discountAmount2 = (item.desc2 / 100) * itemTotal;
                    itemTotal -= discountAmount2;
                }

                return acc + itemTotal;
            } else {
                return acc;
            }
        }, 0);

        order.total = total;
    }

    next();
});


orderSchema.pre('updateOne', { document: true, query: true }, async function (this: any, next,) {
    const order = this._update

    if (!order.items) {
        throw Error('Nenhum dado alterado')
    }

    if (order) {
        const total = order.items.reduce((acc: any, item: any) => {
            if (item.price && item.quantity) {
                let itemTotal = item.price * item.quantity;

                if (item.ipi) {
                    const ipi = item.ipi / 100;
                    itemTotal += itemTotal * ipi;
                }

                if (item.desc1) {
                    const discountAmount1 = (item.desc1 / 100) * itemTotal;
                    itemTotal -= discountAmount1;
                }

                if (item.desc2) {
                    const discountAmount2 = (item.desc2 / 100) * itemTotal;
                    itemTotal -= discountAmount2;
                }

                return acc + itemTotal;
            } else {
                return acc;
            }
        }, 0);

        order.total = total;
    }

    next()
})

orderSchema.post('updateOne', function (error: any, doc: any, next: any) {
    next()
})

export const User = mongoose.model<IUser>('users', userSchema)
export const Customer = mongoose.model<ICustomer>('customers', customerSchema)
export const Company = mongoose.model<ICompany>('companies', companySchema)
export const Order = mongoose.model<IOrder>('orders', orderSchema)
export const Counter = mongoose.model<ICounter>('counters', counterSchema)
