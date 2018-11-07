const drawerWidth = 300;

export const styles = (theme) => ({
  drawerPaperRight: {
    position: 'relative',
    width: drawerWidth,
  },
  info: {
      backgroundColor: '#282828',
      minWidth: '70% !important',
      width: '70% !important',
      margin: '10% auto'
  },
  icon: {
      fontSize: 12,
  },
      iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
  },
      message: {
      display: 'flex',
      alignItems: 'center',
  }
});