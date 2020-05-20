import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {ClassService} from "./service/class.service";
import {ClassRoutingModule} from "./class.routing.module";

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    ClassRoutingModule,
  ],
  providers: [
    ClassService,
  ],

})
export class ClassModule {

}
