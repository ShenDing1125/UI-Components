import { useState, useReducer } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import mapValues from 'lodash-es/mapValues';
import each from 'lodash-es/each';

export interface SupplyRuleFn {
    getFieldValue: (name: string) => string;
}
export type CustomRuleFn = (Fn: SupplyRuleFn) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFn;
export interface FieldDetail {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}

export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}

export interface FormState {
    isValid: boolean;
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>;
}

export interface FieldsAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any;
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
    switch (action.type) {
        case 'addField':
            return {
                ...state,
                [action.name]: { ...action.value }
            };
        case 'updateValue':
            return {
                ...state,
                [action.name]: { ...state[action.name], value: action.value }
            };
        case 'updateValidateResult':
            const { isValid, errors } = action.value;
            return {
                ...state,
                [action.name]: { ...state[action.name], isValid, errors }
            };
        default:
            return state;
    }
}

function useStore(initValues?: Record<string, FieldDetail>) {
    const initFields: FieldsState = {};
    const [formState, setFormState] = useState<FormState>({ isValid: false, isSubmitting: false, errors: {} });
    const [fields, dispatch] = useReducer(fieldsReducer, initFields);
    const getFieldValue: SupplyRuleFn['getFieldValue'] = (key: string) => {
        return fields[key] && fields[key].value;
    };
    const getAllFieldValues = () => {
        return mapValues(fields, (item) => item.value);
    };
    const setFieldValue = (name: string, value: any) => {
        fields[name] && dispatch({ type: 'updateValue', name, value });
    };
    const resetFields = () => {
        if (initValues) {
            each(initValues, (value, name) => {
                setFieldValue(name, value);
            });
        }
    };
    const transformRules = (rules: CustomRule[]) => {
        return rules.map((rule) => {
            return typeof rule === 'function' ? rule({ getFieldValue }) : rule;
        });
    };
    const validateField = async (name: string) => {
        const { value, rules } = fields[name];
        const _rules = transformRules(rules);
        const descriptor = {
            [name]: _rules
        };
        const valueMap = {
            [name]: value
        };
        const validator = new Schema(descriptor);
        let isValid = false;
        let errors: ValidateError[] = [];
        try {
            await validator.validate(valueMap);
            isValid = true;
        } catch (e) {
            errors = (e as ValidateErrorType).errors;
        } finally {
            dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } });
        }
    };
    const validateAllFields = async () => {
        let isValid = false;
        let errors: Record<string, ValidateError[]> = {};
        const valueMap = mapValues(fields, (item) => item.value);
        const descriptor = mapValues(fields, (item) => transformRules(item.rules));
        const validator = new Schema(descriptor);
        setFormState({ ...formState, isSubmitting: true });
        try {
            await validator.validate(valueMap);
            isValid = true;
        } catch (e) {
            errors = (e as ValidateErrorType).fields;
            each(fields, (value, name) => {
                if (errors[name]) {
                    const itemErrors = errors[name];
                    dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors } });
                } else if (value.rules.length > 0 && !errors[name]) {
                    dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] } });
                }
            });
        } finally {
            setFormState({ ...formState, isSubmitting: false, isValid, errors });
            return {
                isValid,
                errors,
                values: valueMap
            };
        }
    };
    return {
        fields,
        formState,
        dispatch,
        validateField,
        validateAllFields,
        getFieldValue,
        setFieldValue,
        getAllFieldValues,
        resetFields
    };
}

export default useStore;
