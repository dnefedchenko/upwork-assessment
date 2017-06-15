import {Component, OnInit} from "@angular/core";
import {Validators, FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService, Customer, Invoice, Product} from "../../services/api.service";

@Component({
    selector: 'invoice',
    templateUrl: 'new-invoice.html',
    styleUrls: ['./new-invoice.css']
})
export class NewInvoiceComponent implements OnInit {
    invoiceForm: FormGroup;
    newInvoice: Invoice;

    customers: Array<Customer>;

    constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {

    }

    ngOnInit(): void {
        this.customers = this.apiService.getCustomers();
        this.newInvoice = new Invoice(1, new Array<Product>(), this.customers[0], 0.0, 0.0);

        this.invoiceForm = this.formBuilder.group({
            customer: [this.newInvoice.customer],
            products: this.formBuilder.array([this.initProduct()]),
            cost: [this.newInvoice.cost],
            discount: [this.newInvoice.discount]
        });
    }

    initProduct(): FormGroup {
        return this.formBuilder.group({
            id: [''],
            name: [{value: 'name goes here', disabled: true}, Validators.required],
            quantity: ['1.0', Validators.required]
        });
    }

    addProduct(): void {
        let products = <FormArray>this.invoiceForm.controls['products'];
        products.push(this.initProduct());
    }

    removeProduct(index: number): void {
        let products = <FormArray>this.invoiceForm.controls['products'];
        products.removeAt(index);
    }

    saveInvoice(): void {
        console.log("Invoice saving goes here.");
        this.apiService.createInvoice(this.invoiceForm.value);
        this.newInvoice = new Invoice(1, new Array<Product>(), this.customers[0], 0.0, 0.0);
        this.router.navigateByUrl('invoices');
    }
}