export const styles = (theme) => ({    
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    Logo: {
      margin: 'auto',
      display: 'block',
      maxWidth: '60px',
      //maxHeight: '20%',
    }
});