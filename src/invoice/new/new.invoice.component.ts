import {Component, OnInit} from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'invoice',
    templateUrl: 'new-invoice.html',
    styleUrls: ['./new-invoice.css']
})
export class NewInvoiceComponent implements OnInit {
    invoiceForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private router: Router) {

    }

    ngOnInit(): void {
        this.invoiceForm = this.formBuilder.group({
            'title': ['e.g. some invoice', Validators.required],
            'customer': ['e.g. test customer'],
            'cost': ['e.g. 10.0'],
            'discount': ['e.g. 1.0']
        });
    }

    addProduct(): void {
        console.log(this.invoiceForm.value);
    }

    saveInvoice(): void {
        console.log("Invoice saving goes here.");
        this.router.navigateByUrl('invoices');
    }
}