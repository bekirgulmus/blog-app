import {Context} from "../context/BlogContext";
import {useContext} from "react";
import {View, Text} from "react-native";
import BlogPostForm from "../components/BlogPostForm";

export default function EditScreen({navigation,route}) {
    const {state, addBlogPost,editBlogPost} = useContext(Context);

    const id = route.params.id;
    const blogPost = state.find((blogPost) => blogPost.id === route.params.id);

    return (
        <View>
            <BlogPostForm
                isEditable={true}
                initialValues={{title: blogPost.title, content: blogPost.content}}
                onSubmit={(title,content) => {
                    editBlogPost(id, title,content, () => navigation.pop());
                }}
            />
        </View>
    )
}
