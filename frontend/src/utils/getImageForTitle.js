export function getImageForTitle(title, category = '', width = 800, height = 600) {
  // Generate a data URL SVG with the product title/category
  const text = title || category || 'Product';
  const shortText = text.length > 20 ? text.substring(0, 17) + '...' : text;

  // Generate a color based on the text
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];
  const colorIndex = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  // Create SVG data URL
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">${shortText}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function getRandomPlaceholder(width = 800, height = 600, seed = '') {
  // Generate a simple colored rectangle with optional text
  const text = seed || 'Placeholder';
  const colors = ['#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563'];
  const colorIndex = (seed ? seed.length : Math.floor(Math.random() * 100)) % colors.length;
  const bgColor = colors[colorIndex];

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" dominant-baseline="middle" fill="#374151">${text}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
