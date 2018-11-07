import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

//Styles
import { styles } from './styles';

const DrawerHeaderLeft = (props) => {
    const { classes, handleDrawerClose } = props;
    return (

        <div className={classes.drawerHeader}>
            <img className={classes.Logo} alt="logo" src={require('../../../assets/logo.jpg')} />
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>

    )
}


DrawerHeaderLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerHeaderLeft);