import SiteHeader from '@components/Site/SiteHeader'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

export default function AdminLayout() {
  const segment = useSelectedLayoutSegment()
  const isAdmin = segment?.match('admin')
  return <>{!isAdmin && <SiteHeader />}</>
}