import React, { Component } from 'react';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Polygon } from 'ol/geom';
import { Style, Fill, Stroke } from 'ol/style';
import {  defaults as defaultControls, ZoomSlider, FullScreen } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import { transform } from 'ol/proj';
import * as turf from '@turf/turf'

import { access_token } from './token_map'

//Styles
import './styles.css';

class MapBBB extends Component {
    constructor(props){
        super(props);
        this.state = {
            centerLong: 11.576124,
            centerLat: 48.137154,
            centerPoint: [],
            zoom: 8,
            maxZoom: 20,
            minZoom: 2,
        }
        this.createMap = this.createMap.bind(this);
        this.createCenterPoint = this.createCenterPoint.bind(this);
        this.createCircleLayer = this.createCircleLayer.bind(this);
        this.pushLayer = this.pushLayer.bind(this);
        this.paintLayer = this.paintLayer.bind(this);
        this.centerAddress = this.centerAddress.bind(this);
        this.removeOldAddress = this.removeOldAddress.bind(this);
        this.makePolygonFromCoordinates = this.makePolygonFromCoordinates.bind(this);
        this.getCenterOfExtent = this.getCenterOfExtent.bind(this);
        this.makePolygonFromCentroid = this.makePolygonFromCentroid.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    // // componentWillReceiveProps(nextProps){
        
    // // }

    componentWillMount() {
        this.createCenterPoint();
    }

    componentDidMount() {
        this.createMap();
    }

    componentDidUpdate(prevProps) {
        //Typical usage (don't forget to compare props):
        if(this.props.selectedInfo !== prevProps.selectedInfo) {
            this.createCircleLayer(this.props.selectedInfo.coordAddress);
        }else if(this.props.polygonZone !== prevProps.polygonZone){
            this.makePolygonFromCentroid(this.props.polygonZone);
        }
    }

    createCenterPoint = () => {
        const centerPoint = transform([this.state.centerLong, this.state.centerLat], 'EPSG:4326','EPSG:3857');
        this.setState({
            centerPoint: centerPoint
        });
    }

    createMap = () => {
        const view = new View({
            center: this.state.centerPoint,
            zoom: this.state.zoom,
            maxZoom: this.state.maxZoom,
            minZoom: this.state.minZoom
        });

        const source = new XYZ({
            url: `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${access_token}`
        });
          
          
        const baseLayer = new TileLayer({
            source: source
        });

        const map = new Map({
            target: this.refs.mapContainer,
            controls: defaultControls().extend([
                new ZoomSlider(),
                new FullScreen()
            ]), 
            attributionOptions: {
                collapsible: false
            },
            interactions: defaultInteractions({
                mouseWheelZoom: true
            }),
            renderer: 'canvas',
            layers: [baseLayer],
            view: view
        });

        this.props.setInitMap(map,view,baseLayer); 
    };

    //Create a new circle layer (vectorlayer)
    createCircleLayer = (coord) => {
        const center = transform([coord.longAddress,coord.latAddress], 'EPSG:4326', 'EPSG:3857');       
        const circle = new Circle(
            center,
            20
        );
        
        const circleFeature = new Feature(circle);  
        const vectorSource = new VectorSource({
            projection: 'EPSG:4326',
            features: [circleFeature]
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource
        });
        vectorLayer.setZIndex(parseInt(1000, 10));
        this.removeOldAddress();
        this.pushLayer(vectorLayer);  
        this.centerAddress(center);
    }

    //Add new Layer to the map
    pushLayer = (layer) => {       
        const painted = this.paintLayer('rgba(180, 0, 0, 0.7)', 'rgba(180, 0, 0, 1)', 2);
        layer.setStyle(painted);         
        this.props.initialMap.map.addLayer(layer);
    }

    //Paint the address founded
    paintLayer = (fillColor, strokeColor, widthStroke) => {
        const StyleAddress = new Style({
            fill: new Fill({
                color: fillColor
            }),
            stroke: new Stroke({
                color: strokeColor,
                width: widthStroke
            })
        });
        return StyleAddress;
    };

    // Center the address founded
    centerAddress = (coord) => {
        const map = this.props.initialMap.map;
        const view =  map.getView();
        view.setCenter(coord);
        view.setZoom(16);
    };

    //Remove old layers (Address)  
    removeOldAddress = () => {   
        const map = this.props.initialMap.map;

        //FIX: change to a object {} and manage with map.layersToRemove
        let layersToRemove = [];
        map.getLayers().forEach(function (layer) {
            layersToRemove.push(layer);        
        });
    
        const len = layersToRemove.length;
        let i = 0;
        if(len > 1){
            for(i = 1; i < len; i++) { 
                map.removeLayer(layersToRemove[i]);
            }
        }else {
            return false;
        }
    }

    makePolygonFromCoordinates = (coordinates) => {
        let polygon_feature = new Feature({});
        const polygon_geom = new Polygon(coordinates);
        polygon_feature.setGeometry(polygon_geom);
        polygon_feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        return polygon_feature.getGeometry();
    }

    getCenterOfExtent = (polygon) => {
        const bounds = polygon.getExtent(); 
        const x_min  = bounds[0];
        const x_max  = bounds[2];
        const y_min  = bounds[1];
        const y_max  = bounds[3];

        const X = x_min + (x_max-x_min)/2;
        const Y = y_min + (y_max-y_min)/2;
        const center = [X, Y]; 

        return center;
    }

    makePolygonFromCentroid = (coordinates) => {
        const initialPolygon = this.makePolygonFromCoordinates(coordinates);
        const centerPolygon = this.getCenterOfExtent(initialPolygon);        
        const center = transform(centerPolygon, 'EPSG:3857', 'EPSG:4326');
        const radius = 0.353;
        const options = {steps: 64, units: 'kilometers', properties: {zone: 'zone'}};
        const circle = turf.circle(center, radius, options);
        let polygon = new Polygon([circle.geometry.coordinates[0]]);
        polygon.transform('EPSG:4326', 'EPSG:3857');
    
        // Create feature with polygon.
        var feature = new Feature(polygon);

        const painted = this.paintLayer('rgba(178, 235, 249, 0.5)', 'rgba(20, 134, 163, 1)', 2);
        feature.setStyle(painted);
    
        // Create vector source and the feature to it.
        var vectorSource = new VectorSource();
        vectorSource.addFeature(feature);
    
        // Create vector layer attached to the vector source.
        var vectorLayer = new VectorLayer({
            source: vectorSource
        });
                
        this.pushLayer(vectorLayer);
    }


    render() {
        return (
            <div id="mapContainer" ref="mapContainer"> </div>
        );
    }
}

export default MapBBB;
