import { Meta, StoryObj } from '@storybook/react';

import { TransTable } from '../components/Table';

const meta: Meta<typeof TransTable> = {
    component: TransTable,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof TransTable>;

export const Example: Story = {
    render: () => (
        <>
            <div style={{ position: 'relative', width: '320px' }}>
                <div style={{ position: 'absolute', left: '0' }}>
                    <TransTable mode="card">
                        <TransTable.Item label="1" />
                        <TransTable.Item label="2" />
                        <TransTable.Item label="3" />
                    </TransTable>
                </div>
                <div style={{ position: 'absolute', right: '0' }}>
                    <TransTable mode="line">
                        <TransTable.Item label="1" />
                        <TransTable.Item label="2" />
                        <TransTable.Item label="3" />
                    </TransTable>
                </div>
            </div>
        </>
    )
};
