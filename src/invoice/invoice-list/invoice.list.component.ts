import {Component, OnInit} from "@angular/core";
import {ApiService, Invoice} from "../../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'invoice-list',
    template: `
        <div class="row">
            <h3>Invoices</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Customer</th>
                        <th>Cost</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let invoice of invoices">
                        <td>{{invoice.id}}</td>
                        <td>{{invoice.title}}</td>
                        <td>{{invoice.customer}}</td>
                        <td>{{invoice.cost}}</td>
                        <td>{{invoice.discount}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="row">
            <button type="button" class="btn btn-primary" (click)="createInvoice()">Create Invoice</button>        
        </div>
        
        <div *ngIf="showInvoiceCreationForm" class="row">
            <h3>New Invoice</h3>
            
            <form [formGroup]="invoiceForm" class="form-inline">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" formControlName="title">
                </div>
                
                <div class="form-group">
                    <label for="customer">Customer</label>
                    <input type="text" class="form-control" id="customer" formControlName="customer">
                </div>
                
                <div class="form-group">
                    <label for="cost">Cost</label>
                    <input type="text" class="form-control" id="cost" formControlName="cost">
                </div>
                
                <div class="form-group">
                    <label for="discount">Discount</label>
                    <input type="text" class="form-control" id="discount" formControlName="discount">
                </div>
                
                <div class="form-group">
                    <button type="button" class="btn btn-primary" (click)="placeInvoice()">Place Invoice</button>
                </div>
            </form>
        </div>
    `
})
export class InvoiceListComponent implements OnInit {
    showInvoiceCreationForm: boolean = false;
    invoiceForm: FormGroup;

    invoices: Array<Invoice>;

    constructor(private apiService: ApiService, private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.invoices = this.apiService.getInvoices();

        this.invoiceForm = this.formBuilder.group({
            'title': ['e.g. some invoice', Validators.required],
            'customer': ['e.g. test customer'],
            'cost': ['e.g. 10.0'],
            'discount': ['e.g. 1.0']
        });
    }

    createInvoice(): void {
        this.showInvoiceCreationForm = true;
    }

    placeInvoice(): void {
        this.invoices.push(this.invoiceForm.value);
    }
}