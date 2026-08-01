// src/components/ui/ResponsiveTable.jsx
// Shared responsive data-display primitive: card list on mobile
// (below lg), table on desktop (lg and up).
//
// - columns: [{ key, header, render(row) }]
// - renderMobileCard(row): full control over the mobile card markup
// - wrapInCard: set false when nesting inside an existing card/header
//   (e.g. a dashboard widget); set true for standalone full-page use.

export default function ResponsiveTable({
  data,
  keyExtractor,
  columns,
  renderMobileCard,
  minWidthClass = 'min-w-[400px]',
  emptyState = null,
  wrapInCard = true,
}) {
  if (!data || data.length === 0) {
    return emptyState;
  }

  const desktopTable = (
    <div className="overflow-x-auto">
      <table className={`w-full ${minWidthClass}`}>
        <thead className="bg-muted/60 border-b border-border">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-2.5 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr
              key={keyExtractor(row)}
              className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors group"
            >
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {/* Mobile: card list */}
      <div className="lg:hidden space-y-3">
        {data.map(row => (
          <div key={keyExtractor(row)}>
            {renderMobileCard(row)}
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      {wrapInCard ? (
        <div className="hidden lg:block bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {desktopTable}
        </div>
      ) : (
        <div className="hidden lg:block">
          {desktopTable}
        </div>
      )}
    </>
  );
}