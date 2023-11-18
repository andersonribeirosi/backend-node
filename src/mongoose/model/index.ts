import mongoose from "mongoose"

// COUNTER NEXTSEQ
export interface ICounter {
    id: string
    seq: number
}
export interface IPayment {
    id?: number
    payment?: string
    name?: string
}

export interface IServiceInvoice {
    id?: number
    userId?: number
    company?: ICompany | undefined
    createdAt: string | undefined
    paymentCondition?: string | undefined
    valueServiceInvoice?: number
    totalServiceInvoice?: number
    irRf?: number
}

export interface IShippingCompany {
    id?: number
    name?: string
    phone?: string
    email?: string
    city?: string
    state?: string
    cep?: string
    address?: string
}

export interface Options {
    sort?: any
    where?: any
    exclude?: string
}

export interface IAuthentication {
    token: string
    user: IUser
}

export interface IApiResult<T> {
    data?: T
    success?: boolean
    msg?: string
    count?: number
}

// BANCO DE DADOS
export interface IUser {
    id?: number
    name?: string
    login?: string
    password?: string
    imageProfile?: string
}

export interface ICustomer {
    _id?: mongoose.Types.ObjectId
    id: number
    name: string
    ie: string
    phone: string
    cnpj: string
    email?: string
}

export interface ICompany {
    _id?: mongoose.Types.ObjectId
    id: number
    name?: string
    cnpj?: string
    ie?: string
    phone?: string
    email?: string
    address?: string
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
}



export interface IItemOrder {
    id?: any
    product?: string
    price?: number
    quantity?: number
    ipi?: number
    desc1?: number
    desc2?: number
}

// Order
export interface IOrder {
    userId?: number
    user?: IUser

    companyId?: string
    company?: ICompany

    customerId?: string
    customer?: ICustomer

    orderId?: number
    createdAt: string | undefined

    // PAYMENT - OBSERVATION - SHIPPING COMPANY
    payment?: IPayment
    shippingCompany?: string
    annotation: string

    items?: IItemOrder[]
    total?: number

    closed?: boolean
}

// Order
export interface IPriceQuote {
    userId?: number
    user?: IUser

    companyId?: string
    company?: ICompany

    customerId?: string
    customer?: ICustomer

    orderId?: number
    createdAt: string | undefined

    // PAYMENT - OBSERVATION - SHIPPING COMPANY
    payment?: IPayment
    shippingCompany?: string
    annotation: string

    items?: IItemOrder[]
    total?: number

    closed?: boolean
}