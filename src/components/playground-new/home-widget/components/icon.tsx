/**
 * Icon component - renders FontAwesome icons from class names
 */
export function Icon({
  name,
  className = ''
}: {
  name: string;
  className?: string;
}) {
  // Ensure icon name starts with 'fa-' or is just the icon name
  const iconClass = name.startsWith('fa-') ? name : `fa-${name}`;
  
  return <i className={`fa ${iconClass} ${className}`} />;
}


