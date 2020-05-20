import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {StaffService} from "./service/staff.service";
import {StaffRoutingModule} from "./staff.routing.module";

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    StaffRoutingModule,
  ],
  providers: [
    StaffService,
  ],

})
export class StaffModule {

}
