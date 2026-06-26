import { useEffect, useMemo, useState } from 'react';

// El estado del formulario es un objeto con claves string y valores string
type FormState = Record<string, string>;

// Cada validador es una tupla: [función validadora, mensaje de error]
type ValidatorTuple = [(value: string) => boolean, string];

// Las validaciones del formulario mapean cada campo a su tupla
type FormValidations<T extends FormState> = Partial<Record<keyof T, ValidatorTuple>>;

// El resultado de validar: cada campo genera una clave `${field}Valid` con string | null
type FormValidationState = Record<string, string | null>;


export const useForm = <T extends FormState>(
    initialForm: T,
    formValidations: FormValidations<T> = {}
) => {

    const [formState, setFormState] = useState<T>(initialForm);
    const [formValidation, setFormValidation] = useState<FormValidationState>({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);


    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);


    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckedValues: FormValidationState = {};

        for (const formField of Object.keys(formValidations) as (keyof T)[]) {
            const validator = formValidations[formField];
            if (!validator) continue;

            const [fn, errorMessage] = validator;
            formCheckedValues[`${String(formField)}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    };


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    };
};