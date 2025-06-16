#### 냉장고 털기 서비스

- 식재료를 입력하면 AI가 레시피를 알려주는 서비스

#### 주요 기능

1. 식재료들 입력이 가능 합니다.
   - 프롬프트에 추가할 레시피의 키워드를 고릅니다.
   - 키워드는 식재료 입력 후에 선택할 수 있도록 합니다.
   - 사진을 찍어서 올리면 자동으로 재료를 등록해줍니다.
   - 사용자가 직접 추가 가능합니다.
2. 제출을 누르면 레시피를 생성합니다. ( 생성된 레시피 페이지 )
3. 해당 레시피를 공유 가능합니다.
4. 커뮤니티
   - 레시피로 만든 음식을 먹고 후기를 남깁니다.
   - 많이 본 레시피, 좋아요를 많이 받은 순서, 최신순으로 보여줍니다.

```json
[
  {
    "file": "src/app/(posts)/_hooks/use-get-like.tsx",
    "endpoint": "/api/posts/${postId}/like",
    "options": {
      "cache": "no-store"
    },
    "description": "좋아요 상태, 실시간 반영"
  },
  {
    "file": "src/app/(posts)/_components/post-content.tsx",
    "endpoint": "posts/${postId}",
    "options": {
      "cache": "force-cache",
      "next": {
        "tags": ["posts/${postId}"]
      }
    },
    "description": "게시글 상세, 정적 캐싱, 태그 지정"
  },
  {
    "file": "src/app/(community)/_components/post-lists.tsx",
    "endpoint": "posts",
    "options": {
      "next": {
        "revalidate": 3600,
        "tags": ["posts"]
      }
    },
    "description": "게시글 리스트, 1시간마다 갱신"
  },
  {
    "file": "src/components/comments/comment-list.tsx",
    "endpoint": "posts/${postId}/comments",
    "options": {
      "next": {
        "revalidate": 3600,
        "tags": ["posts/${postId}/comments"]
      }
    },
    "description": "댓글 리스트, 1시간마다 갱신"
  },
  {
    "file": "src/app/(posts)/posts/[id]/page.tsx (generateMetadata)",
    "endpoint": "posts/${id}",
    "options": {
      "cache": "force-cache",
      "next": {
        "tags": ["posts/${id}"]
      }
    },
    "description": "메타데이터 생성, 정적 캐싱, 태그"
  },
  {
    "file": "src/app/api/posts/[postId]/views/route.ts (PATCH)",
    "endpoint": "posts/${postId}/views",
    "options": {
      "next": {
        "revalidate": 43200
      }
    },
    "description": "조회수, 12시간마다 갱신"
  },
  {
    "file": "src/app/(home)/_components/recipe-videos.tsx",
    "endpoint": "/api/videos?q=${recipe.title}",
    "options": {},
    "description": "레시피 영상, 클라이언트 요청, 명시적 캐시 옵션 없음"
  },
  {
    "file": "src/app/api/videos/route.ts",
    "endpoint": "https://www.googleapis.com/youtube/v3/search",
    "options": {},
    "description": "유튜브 API, 서버 요청, 명시적 캐시 옵션 없음"
  },
  {
    "file": "src/app/(users)/_components/like-list.tsx",
    "endpoint": "/api/users/me/likes",
    "options": {},
    "description": "내 좋아요 목록, SWR 사용, 명시적 캐시 옵션 없음"
  },
  {
    "file": "src/app/(users)/_components/recipe-list.tsx",
    "endpoint": "/api/users/me/recipes",
    "options": {},
    "description": "내 레시피 목록, SWR 사용, 명시적 캐시 옵션 없음"
  }
]
```
