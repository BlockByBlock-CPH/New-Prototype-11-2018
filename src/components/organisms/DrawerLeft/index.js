import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider } from '@material-ui/core';

//Components
import FormSearch from '../../molecules/FormSearch';
import DrawerHeaderLeft from '../../molecules/DrawerHeaderLeft';

//Styles
import { styles } from './styles';

const DrawerLeft = (props) => {
    const { classes, anchor, open, handleDrawerClose, searchAddress, handleChange, 
        searchedAddress, suggestions, listActive, selectAddress, btnFormDisabled } = props;
    return (
        <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <DrawerHeaderLeft handleDrawerClose={handleDrawerClose} />

            <Divider />

            <FormSearch 
                searchAddress={searchAddress} 
                handleChange={handleChange} 
                searchedAddress={searchedAddress}
                suggestions={suggestions}
                listActive={listActive}
                selectAddress={selectAddress}
                btnFormDisabled={btnFormDisabled}
            /> 
        </Drawer>
    )
}


DrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    anchor: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    searchAddress: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerLeft);