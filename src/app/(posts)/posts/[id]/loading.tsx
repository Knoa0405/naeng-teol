const PostLoading = () => {
  return (
    <div className="mx-auto">
      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="h-72 animate-pulse bg-gray-200 sm:h-80" />
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
            <div className="flex items-center gap-4">
              <div className="h-6 w-16 animate-pulse rounded-md bg-gray-200" />
              <div className="h-6 w-16 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>

          <div className="my-4 h-[1px] animate-pulse bg-gray-200" />

          <div className="mb-6">
            <div className="mb-3 h-6 w-24 animate-pulse rounded-md bg-gray-200" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="h-6 animate-pulse rounded-md bg-gray-200"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 h-6 w-24 animate-pulse rounded-md bg-gray-200" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex gap-3">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-6 flex-1 animate-pulse rounded-md bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoading;
