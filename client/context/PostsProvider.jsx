import React, { createContext, useContext, useState } from 'react'

const PostContext = createContext(null);

export const usePosts = () => {
    return useContext(PostContext);
}

const PostsProvider = ({ children }) => {

    const [posts, setPosts] = useState([])

    return (
        <PostContext.Provider value={{
            posts, setPosts
        }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostsProvider