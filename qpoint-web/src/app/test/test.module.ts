import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {TestService} from "./service/test.service";
import {TestComponent} from "./component/test/test.component";
import {TestRoutingModule} from "./test.routing.module";
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    TestRoutingModule,
  ],
  providers: [
    TestService,
  ],

})
export class TestModule {

}
