import { Meta, StoryObj } from '@storybook/react';

import Alert from '../components/Alert';

const meta: Meta<typeof Alert> = {
    component: Alert,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Example: Story = {
    render: () => <Alert title="我是標題" theme="default" description="我是訊息欄" size="lg" />
};
