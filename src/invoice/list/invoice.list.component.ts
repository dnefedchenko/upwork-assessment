import {Component, OnInit} from "@angular/core";
import {ApiService, Invoice} from "../../services/api.service";
import {Router} from "@angular/router";

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
                        <th>Discount</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let invoice of invoices">
                        <td>{{invoice.id}}</td>
                        <td>{{invoice.customer.name}}</td>
                        <td><span *ngFor="let product of invoice.products">{{product.name}}<br></span></td>
                        <td>{{invoice.cost}}</td>
                        <td>{{invoice.discount}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="row">
            <button type="button" class="btn btn-primary" (click)="navigateTo()">Create Invoice</button>        
        </div>
    `
})
export class InvoiceListComponent implements OnInit {
    invoices: Array<Invoice>;

    constructor(private apiService: ApiService, private router: Router) {

    }

    ngOnInit(): void {
        this.invoices = this.apiService.getInvoices();
    }

    navigateTo(): void {
        this.router.navigateByUrl('add');
    }
}