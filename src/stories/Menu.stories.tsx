import { Meta, StoryObj } from '@storybook/react';

import { TransMenu } from '../components/Menu';

const meta: Meta<typeof TransMenu> = {
    component: TransMenu,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof TransMenu>;

export const Example: Story = {
    render: () => (
        <>
            <div style={{ position: 'relative', width: '320px' }}>
                <div style={{ position: 'absolute', left: '0' }}>
                    <TransMenu mode="vertical">
                        <TransMenu.SubMenu title="vertical">
                            <TransMenu.Item>1</TransMenu.Item>
                            <TransMenu.Item>2</TransMenu.Item>
                            <TransMenu.Item>3</TransMenu.Item>
                        </TransMenu.SubMenu>
                    </TransMenu>
                </div>
                <div style={{ position: 'absolute', right: '0' }}>
                    <TransMenu mode="horizontal">
                        <TransMenu.SubMenu title="horizontal">
                            <TransMenu.Item>1</TransMenu.Item>
                            <TransMenu.Item>2</TransMenu.Item>
                            <TransMenu.Item>3</TransMenu.Item>
                        </TransMenu.SubMenu>
                    </TransMenu>
                </div>
            </div>
        </>
    )
};
