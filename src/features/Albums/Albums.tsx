import { useEffect, useState } from 'react';
import { AlbumType } from './albumsSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Card, List } from 'antd';

type PropsType = {
    albums: AlbumType[],
    albumsOnPage: number,
}

export default function Albums({ albums, albumsOnPage }: PropsType) {
    const navigate = useNavigate();
    const [list, setList] = useState<AlbumType[]>([]);
    const [loading, setLoading] = useState(false);
    const [countAlbum, setCountAlbum] = useState(0);

    useEffect(() => {
        setList(albums.slice(0, albumsOnPage));
        setCountAlbum(prev => prev + albumsOnPage)
    }, [albums, albumsOnPage])

    const onLoadMore = () => {
        setLoading(true);
        if (countAlbum < albums.length) {
            setList(prev => prev.concat(albums.slice(countAlbum, countAlbum + albumsOnPage)));
            setCountAlbum(prev => prev + albumsOnPage)
        }
        setLoading(false);
    }

    return (
        <>
            <List bordered={true} style={{ padding: 15 }} size='large'
                className="demo-loadmore-list"
                loading={loading}
                loadMore={
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 0,
                            height: 32,
                            lineHeight: '32px',
                        }}
                    >
                        <Button type='primary' onClick={onLoadMore} disabled={!(countAlbum < albums.length)}>
                            Loading more
                        </Button>
                    </div>
                }
                dataSource={list}
                grid={{ gutter: 0, column: 3 }}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.title}>
                            <Button type='link' onClick={() => navigate(`/albums/${item.id}`)}>
                                Open album
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}
