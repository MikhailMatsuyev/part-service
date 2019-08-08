import {
    Component,
    Inject,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { oneOfFieldsRequiredValidator } from '@utils/validatorBuilder';
import { UniterState } from '@core/store/reducers';
import { Store } from '@ngrx/store';
import { GetGroupList, getComponentGroupList, CreateGroup } from '@core/store/component-elems';
import { Unsubscribe } from '@core/decorators/unsubscribe';
import { SerieModalComponent } from '@core/models/base-class/modals/base-serie-modal';
import { mapGroupId, mapGroup } from '@utils/base-serie-funcs';

@Component({
    selector: 'app-new-component',
    templateUrl: './new-component.component.html',
    styleUrls: ['./new-component.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class NewComponentElemComponent extends SerieModalComponent implements OnInit, OnDestroy {
    public initialModalState =  {
        group: '',
        serie: '',
        active: true,
        display: true,
        description: ''
    };

    constructor(
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<NewComponentElemComponent>,
        public readonly store: Store<UniterState>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super(fb, dialogRef, store, data);
    }

    public getGroupListDispatch() {
        this.store.dispatch(new GetGroupList());
    }

    public get getGroupListSelector() {
        return getComponentGroupList;
    }

    public initDialogForms(obj): void {
        const groupFields = {
            Group: [obj.group],
            Serie: [obj.serie, this.serieValidate(this.data.isNewGroup, this.data.serie)],
            Active: [obj.active],
            Display: [obj.display],
            Description: [obj.description]
        };
        this.dialogForms = this.fb.group({...groupFields}, {validator: oneOfFieldsRequiredValidator(['Group', 'Serie'])});
    }

    public handleConfirm(): void {
        const {
            Group,
            GroupOrderPriority,
            Serie,
            Active,
            Display,
            Description
        } = this.dialogForms.value;
        const id = mapGroupId(this.data, this.filtersData, Group, this.isActiveConfirmButton);
        const data = mapGroup(id, Group, this.isActiveConfirmButton, GroupOrderPriority);

        if (Serie) {
            data.serie = {
                id: this.data.serieId || null,
                idGroup: id,
                name: Serie.trim(),
                active: Active,
                display: Display,
                description: Description ? Description.trim() : ''
            };
        }

        this.store.dispatch(new CreateGroup(data));
        this.dialogRef.close();
    }
}
