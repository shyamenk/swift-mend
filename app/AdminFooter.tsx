'use client'
import Footer from '@components/Site/Footer'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

export default function AdminFooter() {
  const segment = useSelectedLayoutSegment()
  const isAdmin = segment?.match('admin')
  return <>{!isAdmin && <Footer />}</>
}
