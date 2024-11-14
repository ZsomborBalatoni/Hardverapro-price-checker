import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Input, Button, Stack, Grid, Card, CardContent } from '@mui/joy';
import { addProduct, fetchProducts } from '../../database/databaseService';
import './dashboardlayout.css';

const drawerWidth = 240;

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('home');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [minTargetPrice, setMinTargetPrice] = useState('');
  const [maxTargetPrice, setMaxTargetPrice] = useState('');
  const [products, setProducts] = useState<any[]>([]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const minPrice = parseFloat(minTargetPrice);
    const maxPrice = parseFloat(maxTargetPrice);

    if (isNaN(minPrice) || isNaN(maxPrice) || !name || !url) {
      alert('Please provide valid input.');
      return;
    }

    try {
      await addProduct(name, url, minPrice, maxPrice);
      alert('Product added successfully!');

      setName('');
      setUrl('');
      setMinTargetPrice('');
      setMaxTargetPrice('');
      fetchProductList();
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Error adding product.');
    }
  };

  const fetchProductList = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    if (selectedMenu === 'home') {
      fetchProductList();
    }
  }, [selectedMenu]);

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
          <Typography
            level="h4"
            noWrap
            component="div"
            textColor="#000"
            variant="plain"
          >
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
          <ListItemButton onClick={() => handleMenuClick('home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton onClick={() => handleMenuClick('addProduct')}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Product" />
          </ListItemButton>
          <ListItemButton onClick={() => handleMenuClick('settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>

      <main
        className={`main ${open ? 'open' : ''}`}
        style={{ marginLeft: open ? drawerWidth : 0 }}
      >
        <div className="drawer-header" />
        {selectedMenu === 'home' && (
          <>
            <Typography level="h2" textColor="#000" noWrap>
              Products List
            </Typography>
            <Grid
              container
              sx={{
                display: 'flex',
              }}
            >
              {products.length === 0 ? (
                <Typography component="p" level="body-lg">
                  No products available.
                </Typography>
              ) : (
                products.map((product) => (
                  <Grid
                    key={product.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div className="item-card">
                      <Card
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <CardContent>
                          <Typography level="h4">{product.name}</Typography>
                          <Typography level="body-md" textColor="#000">
                            Min Target Price: {product.min_target_price} HUF
                          </Typography>
                          <Typography level="body-md" textColor="#000">
                            Max Target Price: {product.max_target_price} HUF
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                ))
              )}
            </Grid>
          </>
        )}
        {selectedMenu === 'addProduct' && (
          <>
            <Typography
              component="h2"
              level="h2"
              gutterBottom
              textColor="#000"
              noWrap
            >
              Add New Product
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} className="form-container">
                <Input
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  className="input-field"
                />
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
          </>
        )}
        {selectedMenu === 'settings' && (
          <Typography component="h2" level="h4">
            Settings Content
          </Typography>
        )}
      </main>
    </Box>
  );
};

export default DashboardLayout;
