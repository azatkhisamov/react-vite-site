import { Route, Routes} from 'react-router-dom'
import {  ConfigProvider, Layout, theme } from 'antd';
import { lazy, Suspense } from 'react'
import Loading from '../features/components/Loading';
import Sidebar from './Sidebar';
import Result404 from '../features/components/Result404';
import MainPage from './MainPage';
import styles from "./App.module.css";

const Users = lazy(() => import('../features/Users/Users'));
const UserPage = lazy(() => import('../features/Users/UserPage'));
const PostPage = lazy(() => import('../features/Posts/PostPage'));
const AlbumPage = lazy(() => import('../features/Albums/AlbumPage'));
const AllPosts = lazy(() => import('../features/Posts/AllPosts'));
const Login = lazy(() => import('../features/Auth/Login'));
const EditPost = lazy(() => import('../features/Posts/EditPost'));
const AddPost = lazy(() => import('../features/Posts/AddPost'));
const AllAlbums = lazy(() => import('../features/Albums/AllAlbums'));

const {  Content } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#9E339F',
        borderRadius: 16,
        // colorBgContainer: '#ed4192', 
        // colorBgBase:'#ed4192',
        // colorBgLayout: '#ed4192',
      }
    }}>
      <Layout>
        <Sidebar/>
        <Layout className={styles.layoutWidth}>
          <Content
            style={{
              margin: '24px 28px',
              padding: 30,
              minHeight: '88vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          ><Suspense fallback={
            <Loading/>
          }>
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='users' element={<Users />} />
                <Route path='users/:userId' element={<UserPage />} />
                <Route path='albums/:albumId' element={<AlbumPage />} />
                <Route path='albums' element={<AllAlbums />} />
                <Route path='posts' element={<AllPosts />} />
                <Route path='posts/:postId' element={<PostPage />} />
                <Route path='posts/:postId/edit' element={<EditPost />} />
                <Route path='add-post' element={<AddPost />} />
                <Route path='login' element={<Login />} />
                <Route path='*' element={<Result404 />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App
