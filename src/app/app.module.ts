import {BrowserModule} from "@angular/platform-browser";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AppComponent} from "./app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {InvoiceListComponent} from "../invoice/invoice-list/invoice.list.component";
import {ApiService} from "../services/api.service";

@NgModule({
    declarations: [
        AppComponent,
        InvoiceListComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot()
    ],
    providers: [
        {provide: ApiService, useClass: ApiService}
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
