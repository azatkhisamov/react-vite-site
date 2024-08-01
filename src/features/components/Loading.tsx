import { Flex, Spin } from 'antd'

export default function Loading() {
    return (
        <Flex gap='middle' justify='center' align='center' style={{position: 'absolute', left: "50%", top: '50%'}}>
            <Spin tip='Loading' size='large'></Spin>
        </Flex>
    )
}
