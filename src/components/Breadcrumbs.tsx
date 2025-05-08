import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { ROUTE_TITLES } from '../layouts/constants';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const location = useLocation();
  const params = useParams();
  const theme = useTheme();

  // If items are provided, use them; otherwise, generate from the current path
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname, params);

  return (
    <MuiBreadcrumbs 
      separator={<NavigateNextIcon fontSize="small" />} 
      aria-label="breadcrumb"
      sx={{ mb: 3 }}
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return isLast ? (
          <Typography 
            key={item.label} 
            color="text.primary"
            sx={{ 
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.path || '#'}
            color="inherit"
            underline="hover"
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

// Helper function to generate breadcrumbs from the current path
const generateBreadcrumbs = (pathname: string, params: Record<string, string>): BreadcrumbItem[] => {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', path: '/' }
  ];

  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    
    // Build the full path including any previous segments
    const fullPath = paths.slice(0, index + 1).join('/');
    
    // Check if this is a dynamic segment (e.g., :id)
    const isDynamicSegment = Object.keys(params).some(param => params[param] === path);
    
    // Find the matching route pattern
    const routePattern = isDynamicSegment
      ? Object.keys(ROUTE_TITLES).find(pattern => {
          const segments = pattern.split('/').filter(Boolean);
          return segments.length === index + 1 && 
                 segments.every((seg, i) => seg.startsWith(':') || seg === paths[i]);
        })
      : `/${fullPath}`;

    const label = routePattern 
      ? ROUTE_TITLES[routePattern] 
      : path.charAt(0).toUpperCase() + path.slice(1);

    breadcrumbs.push({
      label,
      path: currentPath,
    });
  });

  return breadcrumbs;
};

export default Breadcrumbs;