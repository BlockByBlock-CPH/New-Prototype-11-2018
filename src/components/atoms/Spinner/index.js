import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';
import { styles } from './styles';


const Spinner = (props) => {

    const { classes } = props;
    
    return (
        <CircularProgress className={classes.progress} style={{ color: cyan[500] }} thickness={7}/>
    );
}


Spinner.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles, { withTheme: true })(Spinner);