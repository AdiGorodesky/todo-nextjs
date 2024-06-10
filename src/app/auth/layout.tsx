export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-200 to-slate-500">
      {children}
    </div>
  );
}
