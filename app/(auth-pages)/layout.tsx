export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-12 bg-black/90 border-2 border-red-900/50 rounded-2xl p-8 shadow-2xl shadow-red-900/30 relative overflow-hidden">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/10 to-black opacity-50 pointer-events-none z-0"></div>
        
        <div className="relative z-10 w-full max-w-4xl">
          {children}
        </div>

        {/* Decorative Border Effect */}
        <div className="absolute inset-0 border-4 border-red-900/30 rounded-2xl pointer-events-none z-0"></div>
      </div>
    </div>
  );
}