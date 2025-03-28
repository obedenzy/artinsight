export function formatDate(date: Date | string | undefined): string {
  if (!date) return 'Recently added';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) return 'Invalid date';

  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format relative time
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays === -1) return 'Tomorrow';
  
  // If more than 7 days, show actual date
  if (Math.abs(diffInDays) > 7) {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Otherwise show relative time
  return `${diffInDays} days ago`;
}
