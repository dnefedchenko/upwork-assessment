export class ApiService {
    invoices: Array<Invoice> = [];

    customers: Array<Customer> = [];
    products: Array<Product> = [];

    constructor() {
        let alex: Customer = new Customer("Alex");
        let inna: Customer = new Customer("Inna");
        let masha: Customer = new Customer("Masha");
        let dmitriy: Customer = new Customer("Dmitriy");
        let eaht: Customer = new Customer("EAHT");
        this.customers.push(alex, inna, masha, dmitriy, eaht);

        let apple: Product = {name: 'apple', price: 1.0, quantity: 1.0};
        let cherry: Product = {name: 'cherry', price: 2.0, quantity: 1.0};
        let peach: Product = {name: 'peach', price: 1.0, quantity: 1.0};
        let pears: Product = {name: 'pears', price: 3.0, quantity: 1.0};
        let grape: Product = {name: 'grape', price: 5.0, quantity: 1.0};
        this.products.push(apple, cherry, peach, pears, grape);

        this.invoices.push(
            {
                products: this.products,
                customer: this.customers[0],
                discount: 0,
                total: 0
            });
    }

    getInvoices(): Array<Invoice> {
        return this.invoices;
    }

    createInvoice(invoice: Invoice): void {
        this.invoices.push(invoice);
    }

    getCustomers(): Array<Customer> {
        return this.customers;
    }

    getProducts(): Array<Product> {
        return this.products;
    }
}

export interface Invoice {
    products: Array<Product>;
    customer: Customer;
    discount: number;
    total: number;
}

export interface Product {
    name: string;
    price: number;
    quantity: number;
}

export class Customer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}