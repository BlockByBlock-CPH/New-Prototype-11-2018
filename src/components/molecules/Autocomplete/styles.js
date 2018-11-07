export const styles = theme => ({
    root: {
    //   height: 250,
      flexGrow: 1,
    },
    container: {
      position: 'relative',
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    suggestion: {
      display: 'block',
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2), 0 1px 0 0 rgba(0, 0, 0, 0.1)',
      borderRadius: 0
      // border: '2px solid red',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
    textField: {
        width: 800,
        marginRight: 5
    },
    paper: {
        width: 280,
        position: 'absolute',
        zIndex: 100,
        boxShadow: '0 1px 0px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.1)'
    },
    menuItems: {
      boxShadow: '0 1px 0px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.1)'
    }
  });