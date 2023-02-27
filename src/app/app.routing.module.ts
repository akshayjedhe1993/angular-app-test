import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Assessment1Component } from './component/assessment1/assessment1.component';
import { Assessment2Component } from './component/assessment2/assessment2.component';

@NgModule({
    declarations: [ ],
    imports: [
        RouterModule.forRoot([
            { path: 'assessment1', component: Assessment1Component },
            { path: 'assessment2', component: Assessment2Component },
            { path: '**', redirectTo: 'assessment2' }
        ])
    ],
    exports: [
        RouterModule,
    ],
    providers: [],

})
export class AppRoutingModule { }
