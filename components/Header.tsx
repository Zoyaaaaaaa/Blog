import Link from 'next/link'
import HeaderAuth from './header-auth'

export default function Header() {
  return (
    <header className="bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/80 sticky top-0 z-40 w-full border-b border-neutral-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="font-light text-2xl text-white flex items-center group"
          >
            <span className="text-red-600 mr-2 group-hover:rotate-45 transition-transform duration-300">
              ◆
            </span>
            BlogAI
          </Link>
          <div className="flex space-x-4">
            <Link 
              href="/blogs" 
              className="text-neutral-400 hover:text-red-500 transition-colors duration-300 flex items-center"
            >
              <span className="mr-1 text-xs opacity-50">→</span>
              Blogs
            </Link>
            <Link 
              href="/create" 
              className="text-neutral-400 hover:text-red-500 transition-colors duration-300 flex items-center"
            >
              <span className="mr-1 text-xs opacity-50">→</span>
              Create
            </Link>
          </div>
        </div>
        <HeaderAuth />
      </nav>
    </header>
  )
}