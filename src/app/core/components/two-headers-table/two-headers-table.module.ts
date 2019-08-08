import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TwoHeadersTableComponent } from './two-headers-table.component';
import { TwoHeadersTableItemComponent } from './two-headers-table-item/two-headers-table-item.component';
import { GetArrOfKeys } from './utils/getArrOfKeys.pipe';
import { AppScrollbarModule } from '../scrollbar/scrollbar.module';

const components = [
  TwoHeadersTableComponent,
  TwoHeadersTableItemComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppScrollbarModule
  ],
  declarations: [...components, GetArrOfKeys],
  exports: [...components]
})
export class TwoHeadersTableModule { }
