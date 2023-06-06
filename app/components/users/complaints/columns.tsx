import {ColumnDef} from '@tanstack/react-table'
import {Payment} from '@/app/lib/data'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-center">Status</div>,
    cell: ({row}) => {
      const status = String(row.getValue('status'))
      let chipColor = ''
      switch (status) {
        case 'Pending':
          chipColor = 'green'
          break
        case 'Processing':
          chipColor = 'blue'
          break
        case 'Success':
          chipColor = 'green'
          break
        case 'Failed':
          chipColor = 'red'
          break
        default:
          chipColor = 'gray'
          break
      }

      return (
        <div
          className={` text-center rounded-full px-2 py-1 bg-${chipColor}-300 text-${chipColor}-800 !important`}
        >
          {status}
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'amount',
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({row}) => {
  //     const amount = parseFloat(row.getValue('amount'))
  //     const formatted = new Intl.NumberFormat('en-IN', {
  //       style: 'currency',
  //       currency: 'INR',
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
]
