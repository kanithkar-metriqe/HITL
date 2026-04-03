import FileStatusPage from '@/pages/file-status'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/file-status')({
  component: FileStatusPage,
})
