import { getPost } from "@/actions";
import { IPostParams } from "@/types/posts";
import Markdown from "react-markdown";

interface IPostDetailProps {
  id: IPostParams["id"];
}

export default async function PostDetail({ id }: IPostDetailProps) {
  const post = await getPost(id);

  return (
    <div className="mx-auto pt-8 flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold">재료</h2>
        <ul className="flex flex-wrap gap-2">
          {post.ingredients.map((ingredient: any) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
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
