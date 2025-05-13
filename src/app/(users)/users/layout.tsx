export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mx-auto max-w-4xl px-4 py-8">{children}</section>;
}
