export type Payment = {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: 'Pending' | 'Processing' | 'Success' | 'Failed'
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    title: 'Power Outage in Apartment',
    description: 'No electricity in the entire building',
    category: 'Electricity',
    priority: 'Low',
    status: 'Pending',
  },
  {
    id: '489e1d42',
    title: 'Electrical wiring issues',
    description: 'No electricity in the entire building',
    category: 'Water',
    priority: 'Medium',
    status: 'Success',
  },
  {
    id: '489e1d42',
    title: 'Low water pressure',
    description: 'No Water Pressure',
    category: 'Gas',
    status: 'Processing',
    priority: 'Low',
  },
  {
    id: '489e1d43',
    title: 'Power Outage in Apartment',
    description: 'No electricity in the entire building',
    category: 'Heating and Cooling',
    status: 'Failed',
    priority: 'High',
  },
]
