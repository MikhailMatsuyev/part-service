import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './filterBy.pipe';
import { FilterByRecursivePipe } from './filterByRecursive.pipe';
import { SortByPipe } from './sortBy.pipe';

const pipes = [
    FilterByPipe,
    FilterByRecursivePipe,
    SortByPipe
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [...pipes],
    exports: [...pipes]
})
export class PipeModule { }
