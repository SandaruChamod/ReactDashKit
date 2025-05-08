import React from 'react';
import { Grid, Box } from '@mui/material';
import { Users, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import Card from '../../components/common/Card';
import Chart from '../../components/common/Chart';
import List from '../../components/common/List';
import PageWrapper from '../../layouts/PageWrapper';

const mockChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const mockListItems = [
  {
    id: 1,
    primary: 'John Doe',
    secondary: 'New user registered',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: 2,
    primary: 'Jane Smith',
    secondary: 'Completed profile setup',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    id: 3,
    primary: 'Mike Johnson',
    secondary: 'Updated account settings',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
];

const Dashboard = () => {
  return (
    <PageWrapper
      title="Dashboard"
      breadcrumbs={[{ label: 'Dashboard' }]}
      showAddButton={false}
    >
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Total Users"
              value="1,234"
              icon={<Users size={24} />}
              trend={{ value: 12, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Revenue"
              value="$50,234"
              icon={<DollarSign size={24} />}
              trend={{ value: 8, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Orders"
              value="845"
              icon={<ShoppingCart size={24} />}
              trend={{ value: 3, isPositive: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Growth"
              value="15%"
              icon={<TrendingUp size={24} />}
              trend={{ value: 5, isPositive: true }}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Chart
            data={mockChartData}
            title="Monthly Revenue"
            height={400}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <List
            items={mockListItems}
            title="Recent Activities"
          />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Dashboard;