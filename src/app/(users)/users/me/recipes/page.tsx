"use client";

import { useEffect, useState } from "react";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { api } from "@/lib/api-helper";
import { TPost } from "@/types/posts";

export default function MeRecipesPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<TPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/api/users/me/recipes");

      if (response.ok) {
        const data = (await response.json()) as TPost[];
        setData(data);
      }
    };

    startTransition(fetchData);
  }, []);

  if (isPending) {
    return (
      <section className="container mx-auto flex h-screen items-center justify-center">
        <Loader />;
      </section>
    );
  }

  return (
    <section className="container mx-auto flex flex-col gap-4">
      {data.map(recipe => (
        <Card
          onClick={() => {
            router.push(`/posts/${recipe.id}`);
          }}
          key={recipe.id}
          className="cursor-pointer hover:bg-accent/50"
        >
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold">{recipe.title}</h3>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {recipe.content}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">재료 : </span>
              {recipe.ingredients
                .map((ingredient: string) => ingredient)
                .join(", ")}
            </p>
            <span className="text-sm text-muted-foreground">
              {recipe.views}명이 본 레시피
            </span>
            <span className="mx-1 text-sm text-muted-foreground">-</span>
            <span className="text-sm text-muted-foreground">
              {recipe.likesCount}명이 좋아요
            </span>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
