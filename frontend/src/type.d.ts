interface IPost {
  _id?: string
  title?: string
  detail?: string
  image?: string
}

type PostState = {
  posts: {
    data: IPost[] | undefined,
    loading: boolean,
    success: boolean,
    error: boolean
  }
}

type PostAction = {
  type: string
  payload?: IPost
}

type DispatchPostType = (args: PostAction) => PostAction