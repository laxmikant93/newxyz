import { PostTypes } from "./types";

const initialState: PostState = {
  posts: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
};

const postReducer = (
  state: PostState = initialState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case PostTypes.CREATE_POST_LOADING:
      return {
        ...state,
        posts: {
          data: [],
          loading: true,
          success: false,
          error: false
        }
      };
    case PostTypes.CREATE_POST_SUCCESS:
      const newPost: IPost = {
        _id: action.payload?._id,
        title: action.payload?.title,
        detail: action.payload?.detail,
        image: action.payload?.image,
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          data: state.posts.data?.concat(newPost),
          loading: false,
          success: true,
          error: false
        }
      };
    case PostTypes.CREATE_POST_ERROR:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
          success: false,
          error: true
        }
      };
    default:
      return state;
  }
};

export default postReducer;