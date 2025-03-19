import { getPost } from "@/actions";
import { IPostParams } from "@/types/posts";

interface IPostDetailProps {
  id: IPostParams["id"];
}

export default async function PostDetail({ id }: IPostDetailProps) {
  const post = await getPost(id);

  return (
    <div className="max-w-4xl mx-auto p-4">
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
