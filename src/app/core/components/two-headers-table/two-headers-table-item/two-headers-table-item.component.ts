import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-two-headers-table-item',
  templateUrl: './two-headers-table-item.component.html',
  styleUrls: ['./two-headers-table-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoHeadersTableItemComponent implements OnChanges, OnInit {
    @Input() public objectProp: string;
    @Input() public object: any;
    @Input() public disabledItem: string[];
    @Input() public textInput: any;
    @Input() public inputMaxLength = 16;
    @Input() public inputMaxValue = Math.pow(10, this.inputMaxLength) - 1;
    @Input() public inputMinValue = 1 - Math.pow(10, this.inputMaxLength - 1);
    @Output() public getNewObject = new EventEmitter();

    @ViewChild('tableElem') tableElem: ElementRef;

    public inputValue: FormControl;
    public disabled = false;
    public inputType = 'number';

    public ngOnChanges(changes: SimpleChanges): void {
      const object = changes['object'];

      if (object && !object.firstChange && object.currentValue) {
        this.inputValue.setValue(object.currentValue, { emitEvent: false });
      }
    }

    public setTextInput = () =>
      this.textInput.forEach(item => this.objectProp === item ? this.inputType = 'text' : this.inputType);

    public setMaxLength = () =>
      this.textInput.forEach(item => this.objectProp === item && item === 'text' ? this.inputMaxLength = 25 : this.inputMaxLength);

    public ngOnInit(): void {
        this.setTextInput();
        this.setMaxLength();
        this.inputValue = new FormControl({
            value: this.object[this.objectProp],
            disabled: this.disabledItem.includes(this.objectProp)
        });
    }

    public onChange(): void {
      const value: string = this.inputValue.value.toString().trim();
      if (this.object[this.objectProp] === value) {
         return;
      }

      if (value.length > this.inputMaxLength || value === '') {
         this.inputValue.setValue(this.object[this.objectProp]);
         return;
      }

      const newValue = this.objectProp === 'text' ? value : parseFloat(value);
      const newObject = {
        ...this.object,
        [this.objectProp]: newValue
      };

      this.object[this.objectProp] = newValue;
      this.getNewObject.emit(newObject);

      if (value !== this.inputValue.value.toString()) {
         this.inputValue.setValue(value);
      }
    }

    public onChangeListener(event): void {
      const value  = this.inputValue.value.toString();
      const { code } = event;

      switch (event.key) {
        case 'Enter':
        case 'Tab':
          this.tableElem.nativeElement.blur();
          break;
        default: {
          break;
        }
      }

      const isMaxLength = value.length === this.inputMaxLength && (code.startsWith('Digit' || code === 'Minus'));
      const isDoublePoint = (code === 'Comma' || code === 'Period') && value.indexOf('.') !== -1;
      if (this.inputType === 'number' && (isMaxLength || isDoublePoint)) {
          event.preventDefault();
          event.stopPropagation();
      }
    }
}
