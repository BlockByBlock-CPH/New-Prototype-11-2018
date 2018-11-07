import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, SnackbarContent } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

//Components
import RightContent from '../../organisms/RightContent';
import DrawerHeaderRight from '../../molecules/DrawerHeaderRight';

//Styles
import { styles } from './styles';

const DrawerRight = (props) => {
    const { classes, anchor, open, title, dataTH, dataTop, totalDataTH } = props;
    return (
        <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            classes={{
                paper: classes.drawerPaperRight,
            }}
        >
            <DrawerHeaderRight title={title} />
    
            <Divider />  
    
            {
                totalDataTH > 0 ?
                <RightContent 
                    dataTH={dataTH} 
                    dataTop={dataTop}
                /> :
                <SnackbarContent
                    className={classes.info}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                        <InfoIcon className={classNames(classes.icon, classes.iconVariant)} />
                        There are not any information about this address!
                        </span>
                    }
                />
            }
    
        </Drawer>
    )
}


DrawerRight.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    anchor: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    dataTH: PropTypes.object.isRequired,
    dataTop: PropTypes.object.isRequired

};

export default withStyles(styles, { withTheme: true })(DrawerRight);