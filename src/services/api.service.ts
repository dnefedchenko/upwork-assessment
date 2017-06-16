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

        let apple: Product = new Product('apple', 1.0, 0.0);
        let cherry: Product = new Product('cherry', 2.0, 0.0);
        let peach: Product = new Product('peach', 1.0, 0.0);
        let pears: Product = new Product('pears', 3.0, 0.0);
        let grape: Product = new Product('grape', 5.0, 0.0);
        this.products.push(apple, cherry, peach, pears, grape);

        this.invoices.push(
            new Invoice(this.products, this.customers[0], 0, 0));
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

export class Invoice {
    products: Array<Product>;
    customer: Customer;
    discount: number;
    total: number;

    constructor(products: Array<Product>, customer: Customer, discount: number, total: number) {
        this.customer = customer;
        this.discount = discount;
        this.total = total;
        this.products = products;
    }
}

export class Product {
    name: string;
    price: number;
    quantity: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

export class Customer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}