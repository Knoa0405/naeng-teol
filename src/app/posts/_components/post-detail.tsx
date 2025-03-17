"use client";

import { IPost } from "@/types/posts";

interface IPostDetailProps {
  post: IPost;
}

export default function PostDetail({ post }: IPostDetailProps) {
  console.log(post);
  return (
    <div className="post-detail">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <ul>
        {post.ingredients.map((ingredient: any) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <div>
        <h2 className="text-2xl font-bold">내용</h2>
        <p>{post.content}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">좋아요</h2>
        <p>{post.likesCount}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">조회</h2>
        <p>{post.views}</p>
      </div>
    </div>
  );
}
