import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

//Components
import MainContent from '../../organisms/MainContent';
import DrawerLeft from '../../organisms/DrawerLeft';
import DrawerRight from '../../organisms/DrawerRight';
import Spinner from '../../atoms/Spinner';
import NavBar from '../../molecules/NavBar';

//Actions
import { setInitMap } from '../../../redux/actions/map_action';
import { setChosenLocation } from '../../../redux/actions/address_action';

//Helpers
import { dataMainChart, dataTableHome, dataTop } from '../../../helpers';

import { API_PHOTON } from '../../../constants/apis';

//Styles
import { styles } from './styles';

class HomeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          openLeft: false,
          anchorLeft: 'left',
          openRight: false,
          anchorRight: 'right',
          appTitleHeader: 'BlockByBlock',
          titleRP: 'More information',
          searched: false,
          dataMC: {},
          dataTH: {},
          dataTop: {},
          loading: true,
          searchedAddress: '',
          selectedCoord: {},
          listActive: false,
          addressInfo: {},
          suggestions: [],
          polygonZone: [],
          totalDataMC: 0,
          totalDataTH: 0,
          selectedAddress: false,
          selectedDay: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.selectAddress = this.selectAddress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setDataMC = this.setDataMC.bind(this);
        this.setDataTH = this.setDataTH.bind(this);
        this.setDataTop = this.setDataTop.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.searchAddress = this.searchAddress.bind(this);
        this.makeSuggestions = this.makeSuggestions.bind(this);
        this.handleChangeSelecteDay = this.handleChangeSelecteDay.bind(this);
    }

    componentDidMount(){
        setTimeout(function() {
            this.setState({ loading: false});
        }.bind(this), 1500)
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if(this.state.searched !== prevState.searched){
            this.searchAddress(this.state.searchedAddress);
        } else if(this.props.mainChart !== prevProps.mainChart) {
            if(this.props.mainChart.totalFeatures > 0){
                this.setDataMC(this.props.mainChart, this.props.selectedDay);
                this.setState({
                    totalDataMC: this.props.mainChart.totalFeatures
                });
                
            }else {
                this.setState({
                    totalDataMC: this.props.mainChart.totalFeatures
                });
            }
        } else if(this.props.tableHome !== prevProps.tableHome){
            if(this.props.tableHome.totalFeatures > 0){
                this.setDataTH(this.props.tableHome, this.props.selectedDay);
                this.setState({
                    totalDataTH: this.props.tableHome.totalFeatures
                });
            }else {
                this.setState({
                    totalDataTH: this.props.tableHome.totalFeatures
                });
            }
        } else if(this.props.dataTop !== prevProps.dataTop){
            this.setDataTop(this.props.dataTop);
        }
    }

    searchAddress = (data) => {
        if(data !== '')
        {
          const API_GEOCODER = `${API_PHOTON}${this.state.searchedAddress}`;
          axios.get(API_GEOCODER)
          .then((response) => {
            let addressInfo = response.data.features.map(res => {
                return {
                    lon: parseFloat(res.geometry.coordinates[0],10),
                    lat: parseFloat(res.geometry.coordinates[1],10),
                    address:{
                        name:res.properties.name,
                        street: res.properties.street,
                        housenumber: res.properties.housenumber,
                        postcode:res.properties.postcode,
                        city:res.properties.city,
                        state:res.properties.state,
                        country:res.properties.country
                    },
                    original:{
                        formatted:res.properties.name,
                        details:res.properties
                    }
                }
            });
    
            this.makeSuggestions(addressInfo);
            this.setState({addressInfo});
          })
          .catch((error) => {
            console.log(error);
          });
        }
    }
    
    makeSuggestions = (data) => {
        let list_suggestions = [];
        let suggestions = data.map((resp,index) =>{
            const country = (resp.address.country === undefined) ? '' : resp.address.country;
            const city = (resp.address.city === undefined) ? '' : resp.address.city+',';
            const street = (resp.address.street === undefined) ? '' : resp.address.street;
            const housenumber = (resp.address.housenumber === undefined) ? '' : resp.address.housenumber+',';
            const name = (resp.address.name === undefined) ? '' : resp.address.name+',';
            const longitude = resp.lon; 
            const latitude = resp.lat;
            
            list_suggestions = {id: index, coord: { longitude, latitude }, value: `${name} ${street} ${housenumber} ${city} ${country}`};

            return list_suggestions;
        });
    
        this.setState({suggestions});
    }
    
    setDataMC = (data, selectedDay) => {
        const dataMC = dataMainChart(data,selectedDay);
        const polygonZone = data.features[0].geometry.coordinates[0];
        this.setState({ dataMC: dataMC,  polygonZone: polygonZone});
    }    

    setDataTH = (data, selectedDay) => {      
        const dataTH = dataTableHome(data,selectedDay);
        this.setState({ dataTH: dataTH });
    }

    setDataTop = (data) => {      
        const dataTP = dataTop(data);
        this.setState({ dataTop: dataTP.dataTop });
    }

    handleDrawerOpen = () => {
        this.setState({ openLeft: true });
    }
    
    handleDrawerClose = () => {
        this.setState({ openLeft: false });
    }

    handleChange = (e) => {
        let searchTxt = e.target.value;
        this.setState({ 
            searchedAddress: searchTxt,
            suggestions: [],
            listActive: false,
            searched: false
        }); 
    }

    handleChangeSelecteDay = (e) => {
        let selectedDay = e.target.value;
        this.setState({ 
            selectedDay: selectedDay          
        });    
    }

    //OnClick AutocompleteComponent
    selectAddress = (event) => {
        const suggestions = [...this.state.suggestions];
        const { selectedDay } = this.state;
        const selectAddress = suggestions.filter(s => s.id === parseInt(event.target.id,10));

        this.props.setChosenLocation(selectAddress[0].coord, selectedDay);
        
        this.setState({ 
            selectedCoord: selectAddress[0].coord,
            listActive: false,
            openRight: true,
            openLeft: false,
            selectedAddress: true,
            searched: false,
            suggestions: []
        });
    }

    handleClick = (event) => {
        event.preventDefault();              
        this.setState({
            searched: true,
            listActive: true
        });        
    }

    render() {
        
        const { classes, setInitMap, selectedInfo, initialMap  } = this.props;
        const { anchorLeft, openLeft, anchorRight, openRight, appTitleHeader, titleRP, 
                loading, dataMC, dataTH, dataTop, searchedAddress, listActive, suggestions, 
                polygonZone, totalDataMC, totalDataTH, selectedAddress, selectedDay } = this.state;

        if(loading === true){
            return (
                <Paper className={classes.PaperSpinner}>
                    <Spinner />
                </Paper>
            );
        }

        return (
            <div className={classes.root}>        
                <div className={classes.appFrame}>
                    <NavBar 
                        open={openLeft}
                        anchor={anchorLeft}
                        handleDrawerOpen={this.handleDrawerOpen}
                        title={appTitleHeader}
                    />
                    <DrawerLeft 
                        anchor={anchorLeft}
                        open={openLeft}
                        handleDrawerClose={this.handleDrawerClose}
                        searchAddress={this.handleClick}
                        handleChange={this.handleChange}
                        selectAddress={this.selectAddress}
                        handleChangeSelecteDay={this.handleChangeSelecteDay}
                        searchedAddress={searchedAddress}
                        suggestions={suggestions}
                        listActive={listActive}
                        selectedDay={selectedDay}
                    />
                    <main
                        className={classNames(classes.content, classes[`content-${anchorLeft}`],
                        {
                            [classes.contentShift]: openLeft,
                            [classes[`contentShift-${anchorLeft}`]]: openLeft,
                            [classes.contentChanged]: selectedAddress,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        
                        <MainContent 
                            selectedAddress={selectedAddress} 
                            setInitMap={setInitMap}
                            selectedInfo={selectedInfo}
                            initialMap={initialMap}
                            dataMC={dataMC}
                            polygonZone={polygonZone}
                            totalDataMC={totalDataMC}
                        />
                    </main>
                    { 
                        openRight === false ? null : 
                            <DrawerRight 
                                title={titleRP} 
                                anchor={anchorRight} 
                                open={openRight} 
                                dataTH={dataTH}
                                dataTop={dataTop}
                                totalDataTH={totalDataTH}
                            /> 
                    }
                </div>
            </div>
        )
    }
}

HomeContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    selectedInfo: PropTypes.object.isRequired,
    initialMap: PropTypes.object.isRequired,
    mainChart: PropTypes.object.isRequired,
    selectedDay: PropTypes.number,
    tableHome: PropTypes.object.isRequired,
    dataTop: PropTypes.object.isRequired,
    setInitMap: PropTypes.func.isRequired,
    setChosenLocation: PropTypes.func.isRequired
};
  
function mapStateToProps({ address, map }) {
    return {
        selectedInfo: address.selectedInfo,
        initialMap: map.initialMap,
        mainChart: address.mainChart,
        selectedDay: address.selectedInfo.selectedDay,
        tableHome: address.tableHome,
        dataTop: address.dataTop
    }
}

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps,{setInitMap,setChosenLocation})(HomeContainer)
);