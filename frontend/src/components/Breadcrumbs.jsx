import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Breadcrumbs Component
 * Navigation breadcrumbs for better UX
 */
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbNameMap = {
    'product': 'Product Details',
    'cart': 'Shopping Cart',
    'checkout': 'Checkout',
    'profile': 'Profile',
    'about': 'About Us',
    'contact': 'Contact',
    'track-order': 'Track Order',
    'size-guide': 'Size Guide',
    'shipping-info': 'Shipping Info',
    'returns-exchanges': 'Returns & Exchanges',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service'
  };

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 py-3 px-4 mb-6 rounded-lg">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            to="/"
            className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
          >
            Home
          </Link>
        </li>

        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

          return (
            <li key={pathname} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;