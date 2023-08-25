import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SubjectComponent } from './comps/subject/subject.component';
import { DeferComponent } from './comps/operators/defer/defer.component';
import { FromComponent } from './comps/operators/from/from.component';
import { FromEventComponent } from './comps/operators/from-event/from-event.component';
import { GenerateComponent } from './comps/operators/generate/generate.component';
import { IntervalComponent } from './comps/operators/interval/interval.component';
import { TimerComponent } from './comps/operators/timer/timer.component';
import { IifComponent } from './comps/operators/iif/iif.component';
import { ConcatComponent } from './comps/operators/concat/concat.component';
import { MergeComponent } from './comps/operators/merge/merge.component';
import { PartitionComponent } from './comps/operators/partition/partition.component';
import { PipeComponent } from './comps/pipe/pipe.component';
import { AuditComponent } from './comps/operators/audit/audit.component';
import { DebounceComponent } from './comps/operators/debounce/debounce.component';
import { DistinctComponent } from './comps/operators/distinct/distinct.component';
import { FilterComponent } from './comps/operators/filter/filter.component';
import { IgnoreElementsComponent } from './comps/operators/ignore-elements/ignore-elements.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    DeferComponent,
    FromComponent,
    FromEventComponent,
    GenerateComponent,
    IntervalComponent,
    TimerComponent,
    IifComponent,
    ConcatComponent,
    MergeComponent,
    PartitionComponent,
    PipeComponent,
    AuditComponent,
    DebounceComponent,
    DistinctComponent,
    FilterComponent,
    IgnoreElementsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
