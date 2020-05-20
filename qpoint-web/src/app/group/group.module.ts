import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {GroupRoutingModule} from "./group.routing.module";
import {GroupService} from "./service/group.service";

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    GroupRoutingModule,
  ],
  providers: [
    GroupService,
  ],

})
export class GroupModule {

}
