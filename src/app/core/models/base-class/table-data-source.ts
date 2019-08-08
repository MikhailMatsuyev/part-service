import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

export class TableDataSource<T> {
    public dataSource = null;

    constructor(
        private data: any,
        private titleName: string,
        private displayedColumns: string[]
    ) {
        this.dataSource = new MatTableDataSource<T>(this.data);
    }

    public get connection(): BehaviorSubject<T[]> {
        return this.dataSource.connect();
    }

    public get value(): any {
        return this.connection.getValue();
    }

    public get title(): string {
        return this.titleName;
    }

    public get columns(): string[] {
        return this.displayedColumns;
    }

    public setValue(data: any) {
        this.connection.next(data);
    }
}
