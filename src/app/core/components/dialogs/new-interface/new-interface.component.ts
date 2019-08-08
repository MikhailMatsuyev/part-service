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
import { GetGroupList, getInterfaceGroupList, CreateGroup } from '@core/store/interfaces';
import { Unsubscribe } from '@core/decorators/unsubscribe';
import { SerieModalComponent } from '@core/models/base-class/modals/base-serie-modal';
import { mapGroupId, mapGroup } from '@utils/base-serie-funcs';

@Component({
    selector: 'app-new-interface',
    templateUrl: './new-interface.component.html',
    styleUrls: ['../new-group/new-group.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class NewInterfaceComponent extends SerieModalComponent implements OnInit, OnDestroy {
    public initialModalState =  {
        group: '',
        serie: '',
        interfaceAction: false,
        description: ''
    };

    constructor(
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<NewInterfaceComponent>,
        public readonly store: Store<UniterState>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super(fb, dialogRef, store, data);
    }

    public getGroupListDispatch() {
        this.store.dispatch(new GetGroupList());
    }

    public get getGroupListSelector() {
        return getInterfaceGroupList;
    }

    public initDialogForms(obj): void {
        const groupFields = {
            Group: [obj.group],
            Serie: [obj.serie, this.serieValidate(this.data.isNewGroup, this.data.serie)],
            InterfaceAct: [obj.interfaceAction],
            Description: [obj.description]
        };
        this.dialogForms = this.fb.group({...groupFields}, {validator: oneOfFieldsRequiredValidator(['Group', 'Serie'])});
    }

    public handleConfirm(): void {
        const {
            Group,
            GroupOrderPriority,
            Serie,
            InterfaceAct,
            Description
        } = this.dialogForms.value;
        const id = mapGroupId(this.data, this.filtersData, Group, this.isActiveConfirmButton);
        const data = mapGroup(id, Group, this.isActiveConfirmButton, GroupOrderPriority);

        if (Serie) {
            data.serie = {
                id: this.data.serieId || null,
                idGroup: id,
                name: Serie.trim(),
                hide: InterfaceAct,
                description: Description ? Description.trim() : ''
            };
        }

        this.store.dispatch(new CreateGroup(data));
        this.dialogRef.close();
    }
}
