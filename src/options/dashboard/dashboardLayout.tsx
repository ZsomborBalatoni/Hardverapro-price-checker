import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Input, Button, Stack } from '@mui/joy';
import { addProduct } from '../../storage/storageService';
import './dashboardlayout.css';

const drawerWidth = 240;

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [minTargetPrice, setMinTargetPrice] = useState('');
  const [maxTargetPrice, setMaxTargetPrice] = useState('');

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const minPrice = parseFloat(minTargetPrice);
    const maxPrice = parseFloat(maxTargetPrice);

    if (isNaN(minPrice) || isNaN(maxPrice) || !url) {
      alert('Please provide valid input.');
      return;
    }

    try {
      await addProduct(url, minPrice, maxPrice);
      alert('Product added successfully!');

      setUrl('');
      setMinTargetPrice('');
      setMaxTargetPrice('');
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Error adding product.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" className={`app-bar ${open ? 'open' : ''}`}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <div className="drawer-header">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Settings'].map((text, index) => {
            const icons = [<HomeIcon />, <SettingsIcon />];
            return (
              <ListItem key={text} component="li">
                <ListItemButton>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <main className={`main ${open ? 'open' : ''}`}>
        <div className="drawer-header" />
        <Typography component="h2" variant="h6" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} className="form-container">
            <Input
              placeholder="Product URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              fullWidth
              className="input-field"
            />
            <Input
              placeholder="Minimum Target Price"
              type="number"
              value={minTargetPrice}
              onChange={(e) => setMinTargetPrice(e.target.value)}
              required
              fullWidth
              className="input-field"
            />
            <Input
              placeholder="Maximum Target Price"
              type="number"
              value={maxTargetPrice}
              onChange={(e) => setMaxTargetPrice(e.target.value)}
              required
              fullWidth
              className="input-field"
            />
            <Button type="submit" className="submit-btn">
              Add Product
            </Button>
          </Stack>
        </form>
      </main>
    </Box>
  );
};

export default DashboardLayout;
