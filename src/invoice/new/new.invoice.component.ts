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

        this.newInvoice = {
          products: [],
          customer: this.customers[0],
          discount: 0,
          total: 0
        };

        this.invoiceForm = this.formBuilder.group({
            customer: [this.newInvoice.customer],
            products: this.formBuilder.array([]),
            discount: [this.newInvoice.discount],
            total: [this.newInvoice.total]
        });

        this.productSearch = (text$: Observable<string>) =>
            text$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(term => term.length < 2 ? []
                    : this.allProducts.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

        this.productFormatter = (x: {name: string}) => x.name;

        this.watchProductChanges();
        this.watchDiscountChanges();
    }

    addProduct(event: NgbTypeaheadSelectItemEvent): void {
        let products = <FormArray>this.invoiceForm.controls['products'];

        let newProduct = this.formBuilder.group({
            name: [event.item.name, Validators.required],
            price: [event.item.price],
            quantity: [event.item.quantity, Validators.required]
        });

        products.push(newProduct);
    }

    removeProduct(index: number): void {
        let products = <FormArray>this.invoiceForm.controls['products'];
        products.removeAt(index);
    }

    saveInvoice(invoice): void {
        this.apiService.createInvoice(invoice);
        this.newInvoice = {
          products: [],
          customer: this.customers[0],
          discount: 0,
          total: 0
        };
        this.router.navigateByUrl('invoices');
    }

    watchProductChanges(): void {
        this.invoiceForm.controls['products'].valueChanges.subscribe(newValue => {
            let totalCost = newValue
                .map(product => product.price * product.quantity)
                .reduce(function(accumulator, currentValue, currentIndex, array) {
                    return accumulator + currentValue;
                }, 0);

            let discount: number = this.invoiceForm.controls['discount'].value/100;
            let discountedCost: number = discount ? (totalCost - discount*totalCost) : totalCost;
            this.invoiceForm.controls['total'].setValue(discountedCost.toFixed(2));
        });
    }

    private watchDiscountChanges() {
        this.invoiceForm.controls['discount'].valueChanges.subscribe(newValue => {
            let discount: number = newValue/100;
            let totalCost: number = Number.parseFloat(this.invoiceForm.controls['total'].value);
            let discountedCost: number = discount ? (totalCost - discount*totalCost) : totalCost;
            this.invoiceForm.controls['total'].setValue(discountedCost.toFixed(2));
        });
    }
}