import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList'

export default () => {
    return (
        <div className="container">
            Create a new post
            <PostCreate />
            <hr />
            <h3>Posts </h3>
            <PostList />
        </div>
    )
}