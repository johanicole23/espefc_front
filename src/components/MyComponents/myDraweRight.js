
export default function PersistentDrawerRight() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar disableGutters sx={{ height: '6rem', padding: '1rem' }}>
            <Box display="flex" alignItems="center" sx={{ width: '30%', flex: '0 0 30%', flexGrow: 1 }} noWrap component="div">
              <Box sx={appbar.appBarTitleFormat}>
                <img src={logo} className="App-logo" alt="logo" />
                <Box display="flex" flexDirection="column" marginLeft={'1%'}>
                  <Typography variant="h6" noWrap component="a" href="/" sx={appbar.appBarTitleFc}>FONDO DE CESANTÍA</Typography>
                  <Typography variant="h8" noWrap component="a" href="/" sx={appbar.appBarTitleEspe}>UNIVERSIDAD DE LAS FUERZAS ARMADAS</Typography>
                </Box>
              </Box>
            </Box>
            <IconButton
              color="#005f8f"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }), marginRight: '200px' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader>
  
          </DrawerHeader>
          <MainContent />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <AccountCircleIcon
              sx={{
                width: '45px',
                height: '45px',
                color: '#005f8f',
              }}></AccountCircleIcon>
            <Box sx={{ marginX: 1 }}></Box>
            <Typography variant="body1" sx={home.homeTextH4Left} color="textPrimary">
              Johanna Molina
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Quirografarios', icon: <AttachMoneyIcon />, link: '/cuenta/formulario-quirografario' },
              { text: 'Prendarios', icon: <ElectricCarIcon />, link: '/cuenta/formulario-prendario' },
              { text: 'Educativos', icon: <MenuBookIcon />, link: '/prendario' },
              { text: 'Emergencia de Salud', icon: <MedicationIcon />, link: '/prendario' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => window.location.href = item.link}>
                  <ListItemIcon sx={{ color: '#005f8f' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={
                    <Typography variant="body1" sx={home.homeTextH4Left} color="textPrimary">
                      {item.text}
                    </Typography>
                  } />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { text: 'Historial de Préstamos', icon: <InboxIcon />, link: '/historial' },
              { text: 'Simulador de Préstamos', icon: <MailIcon />, link: '/simulador' },
              { text: 'Configuración Cuenta', icon: <PermDataSettingIcon />, link: '/configuracion' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => window.location.href = item.link}>
                  <ListItemIcon sx={{ color: '#005f8f' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={
                    <Typography variant="body1" sx={home.homeTextH4Left} color="textPrimary">
                      {item.text}
                    </Typography>
                  } />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    );
  }
  