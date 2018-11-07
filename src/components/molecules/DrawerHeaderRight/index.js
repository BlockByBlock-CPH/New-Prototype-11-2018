import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

//Styles
import { styles } from './styles';

const DrawerHeaderRight = (props) => {
    const { classes, title } = props;
    return (

        <div className={classes.drawerHeaderRight}>
            <Typography className={classes.Typography} variant="subtitle1" noWrap>
            {title}
            </Typography>
        </div>

    )
}


DrawerHeaderRight.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerHeaderRight);