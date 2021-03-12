export class PaymentContainer {
    chargeId: string;
    billing: PBilling;
    creditCardDetails: PCredDetails;
}

export class PBilling {
        email: string;
        address: PaymentAddress;
        delayed: boolean;
}

export class PAddress{
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    postCode: string;
    }

export class PCredDetails{
    creditCardId: string;
    creditCardHash: string;
    }