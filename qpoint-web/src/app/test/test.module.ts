import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {TestService} from "./service/test.service";
import {TestComponent} from "./component/test/test.component";
import {TestRoutingModule} from "./test.routing.module";

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
  ],
  providers: [
    TestService,
  ],

})
export class TestModule {

}
