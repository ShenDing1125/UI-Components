import { Meta, StoryObj } from '@storybook/react';

import { TransForm } from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import Icon from '../components/Icon/icon';
import { CustomRule } from '../components/Form/useStore';

const meta: Meta<typeof TransForm> = {
    component: TransForm,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof TransForm>;

const confirmRules: CustomRule[] = [
    { type: 'string', required: true, min: 3, max: 8 },
    ({ getFieldValue }) => ({
        asyncValidator(_, value) {
            return new Promise((resolve, reject) => {
                if (value !== getFieldValue('password')) {
                    reject('The two passwords that you entered do not match!');
                }
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        }
    })
];

export const Example: Story = {
    render: () => (
        <>
            <div style={{ width: '700px' }}>
                <TransForm>
                    {() => (
                        <>
                            <TransForm.Item label="信箱" name="username" rules={[{ type: 'email', required: true }]}>
                                <Input />
                            </TransForm.Item>
                            <TransForm.Item
                                label="密碼"
                                name="password"
                                rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
                                <Input type="password" />
                            </TransForm.Item>
                            <TransForm.Item label="重複密碼" name="confirmPwd" rules={confirmRules}>
                                <Input type="password" />
                            </TransForm.Item>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <TransForm.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    getValueFromEvent={(e) => e.target.checked}
                                    rules={[{ type: 'enum', enum: [true], message: '請同意協議' }]}>
                                    <input type="checkbox" />
                                </TransForm.Item>
                                <span style={{ marginLeft: '5px' }}>同意協議</span>
                            </div>
                            <div
                                style={{
                                    display: 'inline-block',
                                    position: 'relative',
                                    left: '50%',
                                    translate: '-50% 0'
                                }}>
                                <Button type="submit" btnType="primary" size="md">
                                    <Icon icon="smile" />
                                    &nbsp;註冊
                                </Button>
                                {/* <Button type="button" onClick={resetAll}>重置</Button> */}
                            </div>
                        </>
                    )}
                </TransForm>
            </div>
        </>
    )
};
