import { Injectable } from '@angular/core';

@Injectable()
export class DraggableService {
    public sizeCurrentDrag = null;
    private zone: string;

    public startDrag(zone: string) {
        this.zone = zone;
    }

    public accepts(zone: string): boolean {
        return zone === this.zone;
    }
}
