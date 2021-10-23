import React, { useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState(" ");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:8090/posts/${postId}/comments`,
      {
        content: content,
      }
    );
    console.log(response.data);
    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="col-">Title</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
