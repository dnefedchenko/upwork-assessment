export class ApiService {
    getInvoices(): Array<Invoice> {
        let first: Invoice = new Invoice(1, "First milestone", "Mr. Freeman", 11.0, 1.0);
        let second: Invoice = new Invoice(1, "Second milestone", "Mr. Freeman", 11.0, 1.0);
        let third: Invoice = new Invoice(1, "Third milestone", "Mr. Freeman", 11.0, 1.0);
        let fourth: Invoice = new Invoice(1, "Fourth milestone", "Mr. Freeman", 11.0, 1.0);
        let fifth: Invoice = new Invoice(1, "Fifth milestone", "Mr. Freeman", 11.0, 1.0);

        let invoices: Array<Invoice> = [];
        invoices.push(first, second, third, fourth, fifth);
        return invoices;
    }
}

export class Invoice {
    id: number;
    title: string;
    customer: string;
    cost: number;
    discount: number;

    constructor(id: number, title: string, customer: string, cost: number, discount: number) {
        this.id = id;
        this.customer = customer;
        this.title = title;
        this.cost = cost;
        this.discount = discount;
    }
}