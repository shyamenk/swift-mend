'use client'

import {ColumnDef} from '@tanstack/react-table'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'hire',
    header: 'Hiring',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'method',
    header: 'Method',
  },
  {
    accessorKey: 'amount',
    // header: 'Amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({row}) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]
