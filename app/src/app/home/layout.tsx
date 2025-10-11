import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
