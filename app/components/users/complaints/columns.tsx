import { ColumnDef } from '@tanstack/react-table';
import { Complaint } from '../UserProfile';

export const columns: ColumnDef<Complaint>[] = [
  {
    accessorKey: '$id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="bg-green-200 rounded-md px-3 py-1.5">
        {row.getValue('$id')}
      </div>
    ),
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
    accessorKey: 'status',
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = String(row.getValue('status'));

      let chipColor = '';
      switch (status) {
        case 'Open':
          chipColor = 'blue';
          break;
        case 'Close':
          chipColor = 'red';
          break;
        case 'Processing':
          chipColor = 'green';
          break;
        case 'Failed':
          chipColor = 'red';
          break;
        default:
          chipColor = 'gray';
          break;
      }

      const chipClassName = `text-center rounded-full px-4 py-1.5 ${getStatusColorClass(
        chipColor,
      )}`;

      return <div className={chipClassName}>{status}</div>;
    },
  },
];

function getStatusColorClass(color: string): string {
  switch (color) {
    case 'green':
      return 'bg-green-200 text-green-800';
    case 'blue':
      return 'bg-blue-200 text-blue-800';
    case 'red':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
