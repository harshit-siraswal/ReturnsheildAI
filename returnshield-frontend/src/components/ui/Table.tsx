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
    if (isLoading) return <div className="p-8 text-center text-[#8193a7]">Loading...</div>

    return (
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={`w-full min-w-[850px] border-collapse text-left ${className}`}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-3 py-2.75 text-[8px] font-[560] tracking-[0.08em] text-[#74869b] uppercase first:pl-4.75 last:pr-4.75`}
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                onClick={() => onRowClick?.(row)}
                className="transition-colors hover:bg-[rgba(223,240,249,0.045)] border-t border-[rgba(197,219,236,0.06)] cursor-pointer"
              >
                {columns.map((col) => (
                  <td
                    key={`${row.id || idx}-${String(col.key)}`}
                    className={`px-3 py-3.5 text-[10px] text-[#bdcbd7] first:pl-4.75 last:pr-4.75`}
                    style={{ textAlign: col.align || 'left' }}
                  >
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
