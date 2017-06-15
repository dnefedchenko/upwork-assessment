export class ApiService {
    invoices: Array<Invoice> = [];

    constructor() {
        let customer: Customer = new Customer(1, "Odessa");
        let car: Product = new Product(1, "Kia Sportage");
        let cycle: Product = new Product(1, "Comanche");
        let products: Array<Product> = [];
        products.push(car, cycle);

        this.invoices.push(
            new Invoice(1, products, customer, 2.0, 24500.0));
    }

    getInvoices(): Array<Invoice> {
        return this.invoices;
    }

    createInvoice(invoice: Invoice): void {
        this.invoices.push(invoice);
    }
}

export class Invoice {
    id: number;
    products: Array<Product>;
    customer: Customer;
    discount: number;
    cost: number;

    constructor(id: number, products: Array<Product>, customer: Customer, discount: number, cost: number) {
        this.id = id;
        this.customer = customer;
        this.discount = discount;
        this.cost = cost;
        this.products = products;
    }
}

export class Product {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class Customer {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}