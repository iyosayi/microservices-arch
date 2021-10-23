import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState(" ");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/posts", {
      title: title,
    });
    console.log(response.data);
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="col-">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
