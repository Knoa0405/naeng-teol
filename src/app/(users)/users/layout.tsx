export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto max-w-4xl py-8">{children}</section>
  );
}
