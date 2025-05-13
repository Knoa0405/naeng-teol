export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">나만의 레시피</h1>
        <p className="text-muted-foreground">
          맛있는 요리의 순간을 공유해보세요
        </p>
      </div>
      {children}
    </section>
  );
}
