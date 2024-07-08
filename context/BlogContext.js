import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'add_blogpost':
            return [
                ...state,
                {
                    id: Math.floor(Math.random().toString()*99999),
                    title: action.payload.title,
                    content: action.payload.content
                }];
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            })
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload)
        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        //dispatch({type: 'add_blogpost', payload: {title, content}});

        await jsonServer.post('/blogposts', {
            title,
            content
        })

        if (callback) {
            callback();
        }
    }
};

const editBlogPost = (dispatch) => {
    return async (id, title,content, callback) => {
        //dispatch({type: 'edit_blogpost', payload: {id,title, content}});

        await jsonServer.put(`/blogposts/${id}`, {
            title,
            content
        })

        if (callback) {
            callback();
        }
    }
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts')
        dispatch({type: 'get_blogposts', payload: response.data})
    }
};

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        //dispatch({type: 'delete_blogpost', payload: id});
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type: 'delete_blogpost', payload: id});
    }
}

export const {Context, Provider} = createDataContext(blogReducer, {
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
    getBlogPosts
}, [])
