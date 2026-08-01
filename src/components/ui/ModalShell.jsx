// src/components/ui/ModalShell.jsx
// Shared modal shell: bottom sheet on mobile, centered card on desktop.
// Consumers supply their own header/body/footer markup as children.

export default function ModalShell({
  isOpen,
  onClose,
  children,
  maxWidthClass = 'sm:max-w-lg',
  showHandle = true,
  closeOnBackdropClick = false,
  contentClassName = '',
}) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick && onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-card w-full ${maxWidthClass} shadow-2xl rounded-t-2xl sm:rounded-2xl animate-fade-up flex flex-col ${contentClassName}`}
        style={{ maxHeight: '95vh' }}
      >
        {/* Drag handle (mobile only) */}
        {showHandle && (
          <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
            <div className="w-10 h-1 bg-muted rounded-full" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}