import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List as MuiList,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';

interface ListItemData {
  id: string | number;
  primary: string;
  secondary?: string;
  avatar?: string;
}

interface ListProps {
  items: ListItemData[];
  title: string;
}

const List: React.FC<ListProps> = ({ items, title }) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6', fontWeight: 500 }}
      />
      <CardContent sx={{ p: 0 }}>
        <MuiList sx={{ p: 0 }}>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem sx={{ px: 3, py: 2 }}>
                {item.avatar && (
                  <ListItemAvatar>
                    <Avatar src={item.avatar} />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {item.primary}
                    </Typography>
                  }
                  secondary={item.secondary}
                />
              </ListItem>
              {index < items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </MuiList>
      </CardContent>
    </Card>
  );
};

export default List;