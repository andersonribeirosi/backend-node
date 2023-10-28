import mongoose from "mongoose"

// COUNTER NEXTSEQ
export interface ICounter {
    id: string,
    seq: number
}

export interface Options {
    sort?: any
    where?: any
    exclude?: string
}
// 
export interface IAuthentication {
    token: string,
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
    email?: string
}

export interface IItemOrder {
    id?: any
    product?: string
    price?: number
    quantity?: number
    ipi?: number,
    desc1?: number,
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

    // PAYMENT - OBSERVATION - SHIPPING COMPANY
    paymentCondition?: string
    shippingCompany?: string
    annotation: string
   
    items?: IItemOrder[]
    total?: number

    closed?: boolean
}

