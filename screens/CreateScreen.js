import BlogPostForm from "../components/BlogPostForm";
import {useContext} from "react";
import {Context} from "../context/BlogContext";

export default function CreateScreen({navigation}) {
    const {addBlogPost} = useContext(Context)

    return (
        <BlogPostForm isEditable={false} onSubmit={(title,content) => {
            addBlogPost(title,content, () => navigation.navigate('Index'));
        }}/>
    )
}
