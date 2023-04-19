import { PostTypes } from "./types";
import Axios from 'axios';

export const createPost = async (post: IPost) => {
  return async (dispatch: DispatchPostType) => {
    dispatch({ type: PostTypes.CREATE_POST_LOADING });

    const url = 'http://localhost:4444/create';
    const config = { url, method: 'post', headers: { 'Content-Type': 'application/json' }, data: post }
    const response = await Axios(config);

    if (response.status === 201 && response.data) dispatch({ type: PostTypes.CREATE_POST_SUCCESS, payload: response.data });
    else dispatch({ type: PostTypes.CREATE_POST_ERROR, payload: response.data });
  }
}