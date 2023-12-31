import CryptoJS from 'crypto-js'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { DataSource } from '../mongoose/dataSource/methods'
import { IApiResult, ICompany, ICounter, ICustomer, IPayment, IShippingCompany, IUser } from "../mongoose/model"
import { Company, Counter, Customer, Payment, User, ShippingCompany } from '../mongoose/schemas'

export const createShippingCompaniesDefault = async () => {
    var shippingCompanies: IShippingCompany[] = [
        {
            "id": await new CountersDataSource(Counter).seqNext('shipping-companies'),
            "name": "Stancanelli - Tr. Logisti. Ltda.",
            "address": "Rod. BR 101 - Km 88, s/nº",
            "email": "",
            "phone": "(83)3233-2204 (83)3233-4122",
            "city": "João Pessoa",
            "state": "Paraiba",
            "cep": "50088-200"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('shipping-companies'),
            "name": "Figueiredo - Rápido",
            "address": "Av. Jor. Assis Chateubriand, 1391",
            "email": "",
            "phone": "(83)3322-1400",
            "city": "Campina Grande",
            "state": "Paraiba",
            "cep": "58414-500"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('shipping-companies'),
            "name": "Marajá - Transportes e Logística",
            "address": "Rua Frei Vital, 168 - s/3 G",
            "email": "",
            "phone": "(83)3222-0445",
            "city": "João Pessoa",
            "state": "Paraiba",
            "cep": "58010-620"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('shipping-companies'),
            "name": "Campinense - Transp.Cargas Ltda.",
            "address": "Rua Julia Maciel Eulalia , 100",
            "email": "",
            "phone": "(83)3182-3400",
            "city": "Queimadas",
            "state": "Paraiba",
            "cep": "58475-000"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('shipping-companies'),
            "name": "Solnordeste - Tr.Log.Distrib.",
            "address": "Rua Cap. José Rodrigues do Ó , 100 - Gl. 102",
            "email": "",
            "phone": "(83)3233-6565 (83)3233-9165",
            "city": "João Pessoa",
            "state": "Paraiba",
            "cep": "58082-060",
        },
    ]

    for (const shippingCompany of shippingCompanies) {
        var shippingCompanies: IShippingCompany[] = await ShippingCompany.find({
            name: shippingCompany.name
        })

        if (!shippingCompanies[0])
            await DataSource.create({
                data: shippingCompany,
                model: ShippingCompany,
            })
        else
            return
    }
}

export const createPaymentsDefault = async () => {
    var payments: IPayment[] = [
        {
            "id": await new CountersDataSource(Counter).seqNext('payments'),
            "payment": "28 DIAS",
            "name": "28 DIAS"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('payments'),
            "payment": "35 DIAS",
            "name": "35 DIAS"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('payments'),
            "payment": "28/35 DIAS",
            "name": "28/35 DIAS"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('payments'),
            "payment": "28/35/42 DIAS",
            "name": "28/35/42 DIAS"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('payments'),
            "payment": "28/35/42/49 DIAS",
            "name": "28/35/42/49 DIAS"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('payments'),
            "payment": "28/35/42/49/56 DIAS",
            "name": "28/35/42/49/56 DIAS"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('payments'),
            "payment": "30/60/90 DIAS",
            "name": "30/60/90 DIAS"
        },
    ]

    for (const payment of payments) {
        var users: IPayment[] = await Payment.find({
            payment: payment.name
        })

        if (!users[0])
            await DataSource.create({
                data: payment,
                model: Payment,
            })
        else
            return
    }
}

export const createCustomersDefault = async () => {
    var customers: ICustomer[] = [
        {
            "id": await new CountersDataSource(Counter).seqNext('customers'),
            "name": "ATACADÃO DO PARAFUSOS LTDA",
            "cnpj": "08.145.526/0001-15",
            "ie": "16.115.567-10",
            "phone": "83 99156-1345",
            "email": "atacadaodosparafusos@atacadaodosparafusos.com"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('customers'),
            "name": "ALMEIDA COM. DIST. LTDA",
            "cnpj": "15.240.132/0001-10",
            "ie": "16.120.157-10",
            "phone": "83 98840-2055",
            "email": "almeidadistribuidor@almeidadistribuidor.com"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('customers'),
            "name": "RAMOS E MACEDO & CIA LTDA",
            "cnpj": "01.145.526/0001-15",
            "ie": "10.225.567-10",
            "phone": "83 99158-1030",
            "email": "ramosemacedo@ramosemacedo.com"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('customers'),
            "name": "SHOPPING DA ELETRICIDADE",
            "cnpj": "07.125.226/0001-08",
            "ie": "16.115.567-10",
            "phone": "83 98889-1122",
            "email": "shoppingdaeletricidade@gmail.com"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('customers'),
            "name": "MIRO FERRAGENS E FERRAMENTAS",
            "cnpj": "06.445.886/0001-12",
            "ie": "18.555.527-20",
            "phone": "83 98888-1404",
            "email": "atacadaodosparafusos@atacadaodosparafusos.com"
        },

    ]

    for (const customer of customers) {
        var users: IUser[] = await Customer.find({
            name: customer?.name
        })

        if (!users[0])
            await DataSource.create({
                data: customer,
                model: Customer,
            })
        else
            return
    }
}

export const createCompaniesDefault = async () => {
    var companies: ICompany[] = [
        {
            "id": await new CountersDataSource(Counter).seqNext('companies'),
            "name": "COPPERSTEEL BIMETÁLICOS",
            "cnpj": "01.045.556/0001-10",
            "email": "coppersteel@coppersteel.com"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('companies'),
            "name": "INTELLI INDÚSTRIA DE TERMINAIS ELÉTRICOS",
            "cnpj": "02.072.456/0001-18",
            "email": "intelli@intelli.com"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('companies'),
            "name": "METALÚRGICA SÃO RAPHAEL",
            "address": 'Via de Acesso João de Goes, 478',
            "neighborhood": 'Sítio Pedra Rachada',
            "city": "Jandira",
            "state": 'SP',
            "cnpj": "61.370.615/0001-02",
            "ie": '398.020.115',
            "email": "cpagar@saoraphael.com",

        },
        {
            "id": await new CountersDataSource(Counter).seqNext('companies'),
            "name": "DUTOPLAST",
            "cnpj": "08.360.656/0001-75",
            "email": "dutoplast@dutoplast.com"
        },
        {
            "id": await new CountersDataSource(Counter).seqNext('companies'),
            "name": "GERMER S/A",
            "cnpj": "03.239.098/0002-50",
            "email": "germer@germer.com"
        }
    ]

    for (const company of companies) {
        var users: IUser[] = await Company.find({
            name: company?.name
        })

        if (!users[0])
            await DataSource.create({
                data: company,
                model: Company,
            })
        else
            return
    }
}

export const createDefaultConfig = async () => {
    var users: IUser[] = await User.find({
        login: 'root'
    })

    if (!users[0]) {
        await new CountersDataSource(Counter).createSeqNext<ICounter>('users')
        var nextOrderId = await new CountersDataSource(Counter).seqNext('users')

        const defaultUser: IUser = {
            id: nextOrderId,
            name: 'root',
            login: 'root',
            password: '123'
        }

        await DataSource.create({
            data: defaultUser,
            model: User,
            options: {
                exclude: '-password'
            }
        })

        // CRIA OS OUTROS SEQUENCIADORES
        await new CountersDataSource(Counter).createSeqNext<ICounter>('companies')

        await new CountersDataSource(Counter).createSeqNext<ICounter>('customers')

        await new CountersDataSource(Counter).createSeqNext<ICounter>('orders')

        await new CountersDataSource(Counter).createSeqNext<ICounter>('payments')
        await new CountersDataSource(Counter).createSeqNext<ICounter>('shipping-companies')
        await new CountersDataSource(Counter).createSeqNext<ICounter>('service-invoices')

    } else {
        return
    }

    createCompaniesDefault()
    createCustomersDefault()
    createPaymentsDefault()
    createShippingCompaniesDefault()
}

export class Validator {
    static exceptionsMsgs = {
        requiredExceptionUserName: new Error('O nome do usuário é obrigatório'),
        requiredExceptionUserLogin: new Error('O login é obrigatório'),
        requiredExceptionUserPwd: new Error('A senha é obrigatória'),
        duplicatedExceptionLogin: new Error('Já existe um login com este nome')
    }
}

export const isDuplicated = (error: any, keyValue: any) => (keyValue && error?.name === 'MongoServerError' && error?.code === 11000)

export const isEmpty = (value: any, include?: any[]) => ['', null, undefined, ...(include || [])].indexOf(value) !== -1

// CRYPT
export class CryptUtils {
    static secretKey = process.env.secretAuthKey || 'root'

    static crypt(text: string) {
        const encrypt = CryptoJS.AES.encrypt(text, CryptUtils.secretKey).toString()
        return encrypt
    }

    static decrypt = (text: string) => {
        const bytes = CryptoJS.AES.decrypt(text, CryptUtils.secretKey)
        const decrypt = bytes.toString(CryptoJS.enc.Utf8)
        return decrypt
    }

    static cryptMD5(text: string) {
        var hash = CryptoJS.MD5(CryptUtils.secretKey + text).toString()
        return hash
    }

    static parseJwt(token: any) {
        if (token) {
            var base64Payload = token.split('.')[1];
            var payload = Buffer?.from(base64Payload, 'base64');
            return JSON.parse(payload.toString());
        }
    }
}

export class ApiUtils {
    static apiResult<T>({ data, success, count, msg }: { data: T, success: boolean, count?: number, msg?: string }): IApiResult<T> {
        return {
            data,
            success,
            count,
            msg
        }
    }
}