import { Meta, StoryObj } from '@storybook/react';

import { TransSelect } from '../components/Select';

const meta: Meta<typeof TransSelect> = {
    component: TransSelect,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof TransSelect>;

export const Example: Story = {
    render: () => (
        <>
            <div style={{ width: '700px', marginBottom: '200px', padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h4>單選</h4>
                    <TransSelect selectSize="lg">
                        <TransSelect.Option value="1" disabled />
                        <TransSelect.Option value="2" />
                        <TransSelect.Option value="3" disabled />
                        <TransSelect.Option value="4" />
                        <TransSelect.Option value="5" />
                    </TransSelect>
                </div>
                <div>
                    <h4>多選</h4>
                    <TransSelect multiple selectSize="lg">
                        <TransSelect.Option value="1" disabled />
                        <TransSelect.Option value="2" />
                        <TransSelect.Option value="3" disabled />
                        <TransSelect.Option value="4" />
                        <TransSelect.Option value="5" />
                        <TransSelect.Option value="6" />
                        <TransSelect.Option value="7" />
                        <TransSelect.Option value="8" />
                        <TransSelect.Option value="9" />
                        <TransSelect.Option value="10" />
                    </TransSelect>
                </div>
            </div>
        </>
    )
};
