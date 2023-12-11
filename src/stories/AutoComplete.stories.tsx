import { Meta, StoryObj } from '@storybook/react';

import AutoComplete from '../components/AutoComplete';

const meta: Meta<typeof AutoComplete> = {
    component: AutoComplete,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

const placeName = [
    '臺北市',
    '新北市',
    '桃園市',
    '臺中市',
    '臺南市',
    '高雄市',
    '新竹縣',
    '苗栗縣',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義縣',
    '屏東縣',
    '宜蘭縣',
    '花蓮縣',
    '臺東縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
    '基隆市',
    '新竹市',
    '嘉義市'
];
const handleFetch = (query: string) => {
    console.log(placeName.filter((name) => name.includes(query)));
    return placeName.filter((name) => name.includes(query)).map((name) => ({ value: name }));
};

export const Example: Story = {
    render: () => (
        <AutoComplete
            inputSize="md"
            defSize={{ width: '500px', height: '40px' }}
            remind="查無此地名"
            fetchSuggestions={handleFetch}
            placeholder="臺灣地名"
        />
    )
};
