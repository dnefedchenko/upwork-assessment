import {BrowserModule} from "@angular/platform-browser";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AppComponent} from "./app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {InvoiceListComponent} from "../invoice/list/invoice.list.component";
import {ApiService} from "../services/api.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import {NewInvoiceComponent} from "../invoice/new/new.invoice.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

const routes: Routes = [
    {path: '', redirectTo: 'invoices', pathMatch: 'full'},
    {path: 'invoices', component: InvoiceListComponent},
    {path: 'add', component: NewInvoiceComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        InvoiceListComponent,
        NewInvoiceComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: ApiService, useClass: ApiService},
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
