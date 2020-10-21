import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {BehaviourRoutingModule} from "./behaviour.routing.module";
import {BehaviourService} from "./service/behaviour.service";
import {BehaviourListTableComponent} from './component/behaviour-list-table/behaviour-list-table.component';
import {CreateBehaviourFormComponent} from './component/create-behaviour-form/create-behaviour-form.component';
import {ManageBehaviourPageComponent} from './component/manage-behaviour-page/manage-behaviour-page.component';

@NgModule({
  declarations: [
    BehaviourListTableComponent,
    CreateBehaviourFormComponent,
    ManageBehaviourPageComponent],
  imports: [
    CoreModule,
    BehaviourRoutingModule,
  ],
  providers: [
    BehaviourService
  ],

})
export class BehaviourModule {

}
