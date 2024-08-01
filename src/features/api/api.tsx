import axios from "axios";
import { UserType } from "../Users/usersSlice";
import { CommentType, PostType } from "../Posts/PostsSlice";
import { AlbumType } from "../Albums/albumsSlice";
import { TodoType } from "../Todos/todosSlice";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
})

export const requestAllUsers = async () => {
    const responce = await instance<UserType[]>("users");
    return responce.data;
}

export const requestOneUser = async (userId: number | string) => {
    try {
        const responce = await instance<UserType>(`users/${userId}`);
        return responce.data;
    } catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
}

export const requestAllPosts = async () => {
    const responce = await instance<PostType[]>('posts');
    return responce.data;
}

export const requestPostsForUser = async (userId: number | string) => {
    const responce = await instance<PostType[]>(`posts?userId=${userId}`);
    return responce.data;
}

export const requestOnePost = async (postId: number | string) => {
    try {
        const responce = await instance<PostType>(`posts/${postId}`);
        return responce.data;
    } catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
}

export const requestCreatePost = async (userId: number, title: string, body: string) => {
    try {
        const responce = await instance<PostType>("posts", { method: "POST", data: { userId, title, body } });
        return responce.data;
    }
    catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
}

export const requestUpdatePost = async (id: string | number, userId: number, title: string, body: string) => {
    try {
        const responce = await instance<PostType>(`posts/${id}`, {
            method: "PUT",
            data: { id, title, body, userId }
        });
        return responce.data;
    }
    catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
}

export const requestDeletePost = async (postId: number | string) => {
    await instance(`posts/${postId}`, { method: "DELETE" });
    return postId;
}

export const requestCommentsForPost = async (postId: number | string) => {
    const responce = await instance<CommentType[]>(`posts/${postId}/comments`);
    return responce.data;
}

export const requestAlbumsForUser = async (userId: number) => {
    const responce = await instance<AlbumType[]>(`albums/?userId=${userId}`);
    return responce.data;
}

export const requestAllAlbums = async () => {
    const responce = await instance<AlbumType[]>('albums');
    return responce.data;
}

export const requestOneAlbum = async (albumId: number) => {
    try {
        const responce = await instance<AlbumType>(`albums/${albumId}`);
        return responce.data;
    } catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
}

export const requestTodos = async (userId: number) => {
    const responce = await instance<TodoType[]>(`todos?userId=${userId}`);
    return responce.data;
}