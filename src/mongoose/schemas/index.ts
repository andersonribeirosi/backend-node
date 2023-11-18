import moment from 'moment-timezone'
import mongoose, { Schema } from 'mongoose'
import { Validator, isDuplicated, isEmpty } from '../../utils'
import { ICompany, ICounter, ICustomer, IItemOrder, IOrder, IPayment, IPriceQuote, IServiceInvoice, IShippingCompany, IUser } from '../model'

export const counterSchema = new Schema<ICounter>({
    id: {
        type: String,
        required: true
    },
    seq: {
        type: Number
    }
})

export const paymentSchema = new Schema<IPayment>({
    id: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        index: true
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
    ie: {
        type: String,
        required: false
    },
    neighborhood: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    zipCode: {
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

export const shippingCompanySchema = new Schema<IShippingCompany>({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    cep: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
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
    payment: {
        type: Object,
        ref: 'paymentSchema'
    },
    shippingCompany: {
        type: Object,
        ref: 'shippingCompanySchema'
    },
    items: [itemOrderSchema],
    total: Number,
    createdAt: {
        type: String,
        default: () => moment().tz('America/Sao_Paulo').format()
    },
    closed: {
        type: Boolean,
        default: false
    },
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

orderSchema.post('save', function (error: any, doc: any, next: any) {
})

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

// orderSchema.post('updateOne', function (error: any, doc: any, next: any) {
//     next()
// })

orderSchema.pre('updateMany', { document: true, query: true }, async function (this: any, next,) {
    const order = this._update

    // if (!order.items) {
    //     throw Error('Nenhum dado alterado')
    // }

    if (order && order?.items) {
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

/////////////////////////////////////
// PRICE QUOTES
export const priceQuoteSchema = new Schema<IPriceQuote>({
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
    payment: {
        type: Object,
        ref: 'paymentSchema'
    },
    shippingCompany: {
        type: Object,
        ref: 'shippingCompanySchema'
    },
    items: [itemOrderSchema],
    total: Number,
    createdAt: {
        type: String,
        default: () => moment().tz('America/Sao_Paulo').format()
    },
    closed: {
        type: Boolean,
        default: false
    },
})

priceQuoteSchema.pre('save', function (next) {
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

priceQuoteSchema.post('save', function (error: any, doc: any, next: any) {
})

priceQuoteSchema.pre('updateOne', { document: true, query: true }, async function (this: any, next,) {
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

priceQuoteSchema.post('updateOne', function (error: any, doc: any, next: any) {
    next()
})
priceQuoteSchema.pre('updateMany', { document: true, query: true }, async function (this: any, next,) {
    const priceQuote = this._update

    // if (!priceQuote.items) {
    //     throw Error('Nenhum dado alterado')
    // }

    if (priceQuote && priceQuote?.items) {
        const total = priceQuote.items.reduce((acc: any, item: any) => {
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

        priceQuote.total = total;
    }

    next()
})
/////////////////////////////////////////////
export const serviceInvoiceSchema = new Schema<IServiceInvoice>({
    id: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        ref: 'userSchema',
    },
    company: {
        type: Object,
        ref: 'companySchema'
    },
    irRf: {
        type: Number,
        required: false
    },
    paymentCondition: {
        type: String,
        required: true
    },
    valueServiceInvoice: {
        type: Number,
        required: true
    },
    totalServiceInvoice: Number,
    createdAt: {
        type: String
    },
})

serviceInvoiceSchema.pre('save', function (next) {
    const order = this as any;
    if (order) {
        if (order.valueServiceInvoice && order.irRf) {
            let itemTotal = (order.valueServiceInvoice * order.irRf) / 100;
            order.totalServiceInvoice = order.valueServiceInvoice - itemTotal!;

        } else { order.totalServiceInvoice = order.valueServiceInvoice }
    }

    next();
});

serviceInvoiceSchema.pre('updateMany', { document: true, query: true }, async function (this: any, next,) {
    const order = this._update

    if (order) {
        if (order.valueServiceInvoice && order.irRf) {
            let itemTotal = (order.valueServiceInvoice * order.irRf) / 100;
            order.totalServiceInvoice = order.valueServiceInvoice - itemTotal!;

        } else { order.totalServiceInvoice = order.valueServiceInvoice }
    }

    next()
})

// 

export const User = mongoose.model<IUser>('users', userSchema)
export const Customer = mongoose.model<ICustomer>('customers', customerSchema)
export const Company = mongoose.model<ICompany>('companies', companySchema)
export const Counter = mongoose.model<ICounter>('counters', counterSchema)
export const Payment = mongoose.model<IPayment>('payments', paymentSchema)
export const ShippingCompany = mongoose.model<IShippingCompany>('shippingCompanies', shippingCompanySchema)
export const Order = mongoose.model<IOrder>('orders', orderSchema)
export const PriceQuote = mongoose.model<IPriceQuote>('priceQuotes', priceQuoteSchema)
export const ServiceInvoice = mongoose.model<IServiceInvoice>('serviceInvoices', serviceInvoiceSchema)
