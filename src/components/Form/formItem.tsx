import React, { ChangeEvent, FC, ReactElement, ReactNode, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';
import { CustomRule } from './useStore';

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export interface FormItemProps {
    name: string;
    label?: string;
    children?: ReactNode;
    valuePropName?: string; // 子節點值的屬性
    eventTrigger?: string; // 觸發事件的時機
    getValueFromEvent?: (event: any) => any;
    rules?: CustomRule[];
    validateTrigger?: string; // 觸發驗證的時機
}

const judgeComponentValid = (childList: any[]) => {
    const listLength = childList.length;
    if (listLength === 0) {
        console.error('No childElement found in formItem, please provide one form component');
        return;
    }
    if (listLength > 1) {
        console.warn('Only support one component in formItem, others will be omitted');
    }
    for (const child of childList) {
        if (React.isValidElement(child)) {
            return child as ReactElement;
        }
    }
};

export const FormItem: FC<FormItemProps> = (props) => {
    const { name, label, children, valuePropName, eventTrigger, getValueFromEvent, rules, validateTrigger } =
        props as SomeRequired<
            FormItemProps,
            'getValueFromEvent' | 'eventTrigger' | 'valuePropName' | 'validateTrigger'
        >;
    const rowClass = classNames('sd-row', {
        'sd-row-no-label': !label
    });
    const { dispatch, fields, initialValues, validateField } = useContext(FormContext);

    // 掛載初始值
    useEffect(() => {
        const value = (initialValues && initialValues[name]) || '';
        dispatch({
            type: 'addField',
            name,
            value: { label, name, value, rules: rules || [], errors: [], isValid: false }
        });
    }, []);

    const fieldState = fields[name];
    const value = fieldState && fieldState.value;
    const errors = fieldState && fieldState.errors;
    const isRequired = rules?.some((rule) => typeof rule !== 'function' && rule.required);
    const isError = errors && errors.length > 0;
    const labelClass = classNames({
        'sd-form-item-required': isRequired
    });
    const itemClass = classNames('sd-form-item-control', {
        'sd-form-item-error': isError
    });
    const onValueUpdate = (e: any) => {
        const value = getValueFromEvent(e);
        dispatch({ type: 'updateValue', name, value });
    };
    const onValueValidate = async () => {
        await validateField(name);
    };
    const controlProps: Record<string, any> = {};
    controlProps[valuePropName] = value;
    controlProps[eventTrigger] = onValueUpdate;
    rules && (controlProps[validateTrigger] = onValueValidate);

    const childList = React.Children.toArray(children);
    const firstChild = judgeComponentValid(childList);
    const reviseChild =
        firstChild &&
        React.cloneElement(firstChild, {
            ...firstChild.props,
            ...controlProps
        });
    return (
        <>
            <div className={rowClass}>
                {label && (
                    <div className="sd-form-item-label">
                        <label title={label} className={labelClass}>
                            {label}
                        </label>
                    </div>
                )}

                <div className="sd-form-item">
                    <div className={itemClass}>{reviseChild}</div>
                    {isError && (
                        <div className="sd-form-item-error-explain">
                            <span>{errors[0].message}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

FormItem.defaultProps = {
    valuePropName: 'value',
    eventTrigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: (e: ChangeEvent<HTMLInputElement>) => e.target.value
};

export default FormItem;
