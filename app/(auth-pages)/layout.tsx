export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
        
        <div className="relative z-10 w-full max-w-4xl">
          {children}
        </div>


    </div>
  );
}