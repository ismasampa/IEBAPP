export class ChargeContainer{
    charge: Charge;
    billing: Billing;
}

export class Charge{
    description: string;
    amount: number;
    installments: number;
    paymentTypes: [string];
    dueDate: string;
}

export class Billing{
    name: string;
    document: string;
    email: string;
    phone: string;
    address: Address;
    birthDate: string;
    notify: boolean
}
export class PayFullContainer{
    charge: ChargeContainer;
    creditCardHash: string;
}

export class Address{
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    postCode: string;
}     

