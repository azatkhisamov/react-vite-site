import { LikeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react'

const IconText = ({ icon, text, fn }: { icon: React.FC; text: string; fn?: () => void }) => (
    <Space onClick={fn}>
        {React.createElement(icon)}
        {text}
    </Space>
);

type PropsType = {
    countLikes: number | undefined,
    increment: () => void,
}

export default function LikeButton({countLikes, increment}: PropsType) {
    return (
        <IconText icon={LikeOutlined} text={String(countLikes!)}
            fn={increment} key="list-vertical-like-o" />
    )
}
