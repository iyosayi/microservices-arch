import axios from "axios";
import React, { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList() {
  const [posts, setPosts] = useState({});
  async function fetchPosts() {
    const response = await axios.get("http://localhost:8070/posts");
    console.log("🚀 ~ file: PostList.js ~ line 10 ~ fetchPosts ~ response", response.data)
    setPosts(response.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}
