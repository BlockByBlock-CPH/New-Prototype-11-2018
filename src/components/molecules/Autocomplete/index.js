import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { styles } from './styles';

class Autocomplete  extends Component {
    render(){
        const { suggestions, selectAddress, classes } = this.props;
        
        if(suggestions === []){
            return false;
        }else{
            return (
                <Paper className={classes.paper}>
                {
                suggestions.map((s) => {
                    return (
                    <MenuItem key={s.id} onClick={selectAddress} id={s.id} className={classes.suggestion}>
                    {s.value}
                    </MenuItem>
                    )
                })
                }
                </Paper>
            )
        }
    }    
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Autocomplete);