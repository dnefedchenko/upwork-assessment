import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService, Customer, Invoice, Product} from "../../services/api.service";
import {Observable} from "rxjs";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/distinctUntilChanged";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'invoice',
    templateUrl: 'new-invoice.html',
    styleUrls: ['./new-invoice.css']
})
export class NewInvoiceComponent implements OnInit {
    invoiceForm: FormGroup;
    newInvoice: Invoice;

    customers: Array<Customer>;
    allProducts: Array<Product> = [];
    productSearch: any;
    productFormatter: any;

    constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {

    }

    ngOnInit(): void {
        this.customers = this.apiService.getCustomers();
        this.allProducts = this.apiService.getProducts();

        this.newInvoice = new Invoice(new Array<Product>(), this.customers[0], 0.0, 0.0);

        this.invoiceForm = this.formBuilder.group({
            customer: [this.newInvoice.customer],
            products: this.formBuilder.array([]),
            total: [this.newInvoice.total],
            discount: [this.newInvoice.discount]
        });

        this.productSearch = (text$: Observable<string>) =>
            text$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(term => term.length < 2 ? []
                    : this.allProducts.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

        this.productFormatter = (x: {name: string}) => x.name;
    }

    addProduct(event: NgbTypeaheadSelectItemEvent): void {
        let products = <FormArray>this.invoiceForm.controls['products'];

        let newProduct = this.formBuilder.group({
            name: [{value: event.item.name, disabled: true}, Validators.required],
            price: [{value: event.item.price, disabled: true}],
            quantity: [{value: event.item.quantity}]
        });

        products.push(newProduct);
    }

    removeProduct(index: number): void {
        let products = <FormArray>this.invoiceForm.controls['products'];
        products.removeAt(index);
    }

    saveInvoice(): void {
        this.apiService.createInvoice(this.invoiceForm.value);
        this.newInvoice = new Invoice(new Array<Product>(), this.customers[0], 0.0, 0.0);
        this.router.navigateByUrl('invoices');
    }
}