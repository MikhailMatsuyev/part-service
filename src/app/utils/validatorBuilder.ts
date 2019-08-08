import { ValidatorFn, FormGroup, FormControl } from '@angular/forms';

export const oneOfFieldsRequiredValidator = (groupFields: string[]): ValidatorFn => {
    return (group: FormGroup): { [key: string]: boolean } => {
        const groupValidations = groupFields.some(item => {
            const field = group.get(item);
            return field && field.value;
        });
        return groupValidations ? null : {fieldsEmpty: true};
    };
};

export const matchPassword = (passwordField: string, retypePassword: string): ValidatorFn => {
    return (group: FormGroup): { [key: string]: boolean } => {
        const passwordValue = group.get(passwordField).value;
        const retypePasswordValue = group.get(retypePassword).value;
        return passwordValue === retypePasswordValue ? null : {passwordNotEqual: true};
    };
};

export const whitespacesValidator = (control: FormControl) => {
    return control.value.trim().length > 0 ? null : {
        whitespaces: true
    };
};

