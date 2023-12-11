import { Meta, StoryObj } from '@storybook/react';

import { TransIcon } from '../components/Icon';

const meta: Meta<typeof TransIcon> = {
    component: TransIcon,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof TransIcon>;

export const Example: Story = {
    render: () => (
        <>
            <TransIcon icon="coffee" title="coffee" theme="info" size="10x">
                <TransIcon.IconShadow blur="mid" position="far"></TransIcon.IconShadow>
            </TransIcon>
        </>
    )
};
