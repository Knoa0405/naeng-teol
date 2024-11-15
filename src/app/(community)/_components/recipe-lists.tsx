import React from "react";
import RecipeListItem from "./recipe-list-item";

const RecipeLists = () => {
  const items = [
    {
      id: 1,
      image: "https://via.placeholder.com/600/800",
      title: "냉장고 속 재료로 만든 김치볶음밥",
      description: "남은 김치와 햄으로 간단하게 만든 맛있는 볶음밥",
      likes: 234,
      comments: 12,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/600/400",
      title: "15분 만에 완성하는 계란찜",
      description: "바쁜 아침에 간단하게 만드는 부드러운 계란찜",
      likes: 156,
      comments: 8,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/600/600",
      title: "초간단 참치마요 덮밥",
      description: "참치캔 하나로 뚝딱 만드는 든든한 한 그릇",
      likes: 89,
      comments: 5,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/600/700",
      title: "남은 치킨으로 치킨마요 만들기",
      description: "배달 치킨 리메이크 레시피",
      likes: 445,
      comments: 23,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {items.map((item) => (
          <RecipeListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecipeLists;
