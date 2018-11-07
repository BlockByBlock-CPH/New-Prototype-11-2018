import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, MenuItem } from '@material-ui/core';
import  { Search } from '@material-ui/icons';

import Autocomplete from '../../molecules/Autocomplete';

import { styles } from './styles';
import { listDays } from './constants';

const FormSearch = ({ classes, searchAddress, handleChange, searchedAddress, suggestions, listActive, 
    selectAddress, selectedDay, handleChangeSelecteDay }) => {    
   
    return (
        <form className={classes.Form} noValidate autoComplete="off" onSubmit={searchAddress}>
            <TextField 
                type="search" 
                label="Search Address"
                margin="normal"
                fullWidth={true} 
                id="searchAddress"   
                onChange={handleChange}
                value={searchedAddress}          
            />
            {
                listActive === false ? null : <Autocomplete suggestions={suggestions} selectAddress={selectAddress}/>
            }
            <TextField 
                className={classes.Select}
                select 
                value={selectedDay}
                onChange={handleChangeSelecteDay}
                label="" 
                helperText="" 
                margin="normal"
                fullWidth={true}
                id="selectDay"
            >
            {
                listDays.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))
            }
            </TextField>
            <Button 
                className={classes.Button}
                variant="contained" 
                color="primary" 
                type="submit"
                id="btnSearch"
            >
                <Search />
            </Button>
            
        </form>
    )
    
}

FormSearch.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(FormSearch);

  
  
  