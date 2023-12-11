import { Meta, StoryObj } from '@storybook/react';

import Upload from '../components/Upload';
import Button from '../components/Button';

const meta: Meta<typeof Upload> = {
    component: Upload,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Example: Story = {
    render: () => (
        <>
            <div
                style={{
                    width: '700px'
                }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '50px'
                    }}>
                    <Upload action={'#'}>
                        <Button size="lg" btnType="primary">
                            點我上傳
                        </Button>
                    </Upload>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                    <h4>拖動上傳</h4>
                    <Upload action={'#'} drag></Upload>
                </div>
            </div>
        </>
    )
};
