import React, { ReactNode, createContext, forwardRef, useImperativeHandle } from 'react';
import { ValidateError } from 'async-validator';
import useStore, { FieldDetail, FormState } from './useStore';

export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
    name?: string;
    initialValues?: Record<string, FieldDetail>;
    children?: ReactNode | RenderProps;
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> &
    Pick<FormProps, 'initialValues'>;
export type FormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'formState'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form = forwardRef<FormRef, FormProps>((props, ref) => {
    const { name, children, initialValues, onFinish, onFinishFailed } = props;
    const { formState, fields, dispatch, ...restProps } = useStore(initialValues);
    const { validateField, validateAllFields } = restProps;
    // 使其 ref 可以調用 validateField 及 validateAllFields 方法
    useImperativeHandle(ref, () => {
        return {
            ...restProps
        };
    });
    const formItemContext: IFormContext = {
        dispatch,
        fields,
        initialValues,
        validateField
    };
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const { isValid, errors, values } = await validateAllFields();
        if (isValid && onFinish) {
            onFinish(values);
        } else if (!isValid && onFinishFailed) {
            onFinishFailed(values, errors);
        }
    };
    let childrenNode: ReactNode = null;
    if (typeof children === 'function') {
        childrenNode = children(formState);
    } else {
        childrenNode = children;
    }
    return (
        <>
            <form name={name} className="sd-form" onSubmit={formSubmit}>
                <FormContext.Provider value={formItemContext}>{childrenNode}</FormContext.Provider>
            </form>
        </>
    );
});

export default Form;
