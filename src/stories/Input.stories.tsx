import { Meta, StoryObj } from '@storybook/react';

import Input from '../components/Input';

const meta: Meta<typeof Input> = {
    component: Input,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Example: Story = {
    render: () => <Input inputSize="lg" icon="search" prepend="http://" />
};
