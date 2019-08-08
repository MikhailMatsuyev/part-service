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
import { UniterState } from '@store/reducers';
import { Store } from '@ngrx/store';
import { GetGroupList, getUsetGroupList, CreateGroup } from '@store/user-factors';
import { Unsubscribe } from '@core/decorators/unsubscribe';
import { SerieModalComponent } from '@core/models/base-class/modals/base-serie-modal';
import { mapGroupId, mapGroup } from '@utils/base-serie-funcs';

@Component({
    selector: 'app-new-group',
    templateUrl: './new-group.component.html',
    styleUrls: ['./new-group.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class NewGroupComponent extends SerieModalComponent implements OnInit, OnDestroy {
    public initialModalState =  {
        group: '',
        serie: '',
        description: '',
        groupOrderPriority: 0,
        orderPriority: 0,
    } ;

    constructor(
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<NewGroupComponent>,
        public readonly store: Store<UniterState>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super(fb, dialogRef, store, data);
    }

    public getGroupListDispatch() {
        this.store.dispatch(new GetGroupList());
    }

    public get getGroupListSelector() {
        return getUsetGroupList;
    }

    public initDialogForms(obj): void {
        const groupFields = {
            Group: [obj.group],
            GroupOrderPriority: [obj.groupOrderPriority],
            Serie: [obj.serie, this.serieValidate(this.data.isNewGroup, this.data.serie)],
            OrderPriority: [obj.orderPriority],
            Description: [obj.description]
        };
        this.dialogForms = this.fb.group({...groupFields}, {validator: oneOfFieldsRequiredValidator(['Group', 'Serie'])});
    }

    public handleConfirm(): void {
        const {
            Group,
            GroupOrderPriority,
            Serie,
            OrderPriority,
            Description
        } = this.dialogForms.value;
        const id = mapGroupId(this.data, this.filtersData, Group, this.isActiveConfirmButton);
        const data = mapGroup(id, Group, this.isActiveConfirmButton, GroupOrderPriority);

        if (Serie) {
            data.serie = {
                id: this.data.serieId || null,
                idGroup: id,
                name: Serie.trim(),
                description: Description ? Description.trim() : '',
                order: parseFloat(OrderPriority)
            };
        }

        this.store.dispatch(new CreateGroup(data));
        this.dialogRef.close();
    }
}
