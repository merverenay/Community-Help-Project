import React from "react";
import PostShow from "./PostShow";


function PostList({ posts }) {
  return (
    <div>
      {posts
        .slice()

        .map((post, index) => {
          return <PostShow key={index} post={post} />;
        })}

    </div>
  );
}

export default PostList;
