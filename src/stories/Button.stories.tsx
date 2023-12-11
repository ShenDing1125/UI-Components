import { Meta, StoryObj } from '@storybook/react';

import Button from '../components/Button';

const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Example: Story = {
    render: () => <Button btnType="primary" label="Button" size="lg" href="#" />
};
