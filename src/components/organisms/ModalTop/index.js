import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Modal, Typography } from '@material-ui/core';

//Components
import HBarChart from '../../molecules/HBarChart';
import Spinner from '../../atoms/Spinner';

//Styles
import { styles } from './styles';


const ModalTop = (props) => {

    const { classes, dataTop, open, handleClose } = props;

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
            className={classes.Modal}
        >
            <div className={classes.PaperModal}>
                <Typography align="center" variant="h5" id="modal-title">
                    Top 5
                </Typography>
                <Paper className={classes.Paper}>
                {
                    Object.keys(dataTop).length ? <HBarChart dataTop={dataTop.dataChartTop1} /> : <Spinner />
                }
                </Paper>
                <Paper className={classes.Paper}>
                {
                    Object.keys(dataTop).length ? <HBarChart dataTop={dataTop.dataChartTop2} /> : <Spinner />
                }
                </Paper>
                <Paper className={classes.PaperButton}>
                    <Button 
                        className={classes.Button}
                        variant="contained" 
                        color="primary" 
                        type="button"
                        onClick={handleClose}
                    >Close</Button>
                </Paper>
            </div>
        </Modal>
    );
}

ModalTop.propTypes = {
    classes: PropTypes.object.isRequired,
    dataTop: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ModalTop);