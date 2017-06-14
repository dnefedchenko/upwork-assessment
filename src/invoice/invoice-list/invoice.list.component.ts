import {Component, OnInit} from "@angular/core";
import {ApiService, Invoice} from "../../services/api.service";

@Component({
    selector: 'invoice-list',
    template: `
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
    `
})
export class InvoiceListComponent implements OnInit {
    invoices: Array<Invoice>;

    constructor(private apiService: ApiService) {

    }

    ngOnInit(): void {
        this.invoices = this.apiService.getInvoices();
    }
}