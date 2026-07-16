import React, { type ReactNode } from 'react'

type TableColumn<T> = {
  key: keyof T
  label: string
  width?: string
  render?: (value: T[keyof T], row: T) => ReactNode
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T extends { id?: string | number }> {
  columns: TableColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  isLoading?: boolean
  className?: string
}

export const Table = React.forwardRef<HTMLTableElement, TableProps<any>>(
  ({ columns, data, onRowClick, isLoading, className = '' }, ref) => {
    if (isLoading) return <div className="table-loading">Loading…</div>

    return (
      <div className="queue-table-wrap">
        <table ref={ref} className={className}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id || idx} onClick={() => onRowClick?.(row)}>
                {columns.map((col) => (
                  <td key={`${row.id || idx}-${String(col.key)}`} style={{ textAlign: col.align || 'left' }}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
)

Table.displayName = 'Table'
