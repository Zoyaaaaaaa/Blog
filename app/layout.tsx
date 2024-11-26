import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import { EnvVarWarning } from '@/components/env-var-warning'
import HeaderAuth from '@/components/header-auth'
import { ThemeSwitcher } from '@/components/theme-switcher'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata = {
  title: 'BlogAI - AI-Powered Blogging Platform',
  description: 'Create, read, and summarize blogs with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-black text-foreground flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!hasEnvVars && <EnvVarWarning />}
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

