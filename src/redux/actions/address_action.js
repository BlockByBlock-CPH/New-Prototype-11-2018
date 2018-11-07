import axios from "axios";
import { 
    SELECTED_INFO, GET_MAIN_CHART_REQUEST, GET_MAIN_CHART_SUCCESS, GET_MAIN_CHART_FAILURE,
    GET_TABLE_HOME_REQUEST,GET_TABLE_HOME_SUCCESS, GET_TABLE_HOME_FAILURE,
    GET_TOP_REQUEST, GET_TOP_SUCCESS, GET_TOP_FAILURE
} from '../../constants/action_types';
import { 
    WEEK, QUERY14, QUERY_1_2, QUERY_3_4, QUERY17, QUERY18, QUERY17_2, QUERY18_2
} from '../../constants/apis';


export function setChosenLocation(data, selectedDay){
    return (dispatch) => {              
        const chosenLocation = data;
        const longAddress = chosenLocation.longitude;
        const latAddress = chosenLocation.latitude;
        const coordAddress = { latAddress: latAddress, longAddress: longAddress }
        const pointAddress = 'POINT(' + longAddress + ' ' + latAddress + ')';
        const day = parseInt(selectedDay, 10);
        
        if(day === 0){         
            const params = 'COORD:' + pointAddress;
            const mainChart = WEEK+params;
            const tableHome = QUERY_3_4+params;
            const topChart = [QUERY17,QUERY18];
            const selectedInfo = { 
                coordAddress: coordAddress, 
                pointAddress: pointAddress, 
                selectedDay: day, 
                mainChart: mainChart,
                tableHome: tableHome,
                topChart: topChart
            };
            dispatch({ type: SELECTED_INFO, payload: selectedInfo });
            dispatch(getDataMainChart(mainChart));
            dispatch(getDataTableHome(tableHome));
            dispatch(getDataTop(topChart));

        }else if(day > 0){
            const viewparams = ['COORD:' + pointAddress, 'DAY:' + day];
            const params = viewparams.join(';');
            const mainChart = QUERY14+params;
            const tableHome = QUERY_1_2+params;
            const topChart = [QUERY17_2+'DAY:' + day,QUERY18_2+'DAY:' + day];
            const selectedInfo = { 
                coordAddress: coordAddress, 
                pointAddress: pointAddress, 
                selectedDay: day, 
                mainChart: mainChart,
                tableHome: tableHome,
                topChart: topChart
            };
            dispatch({ type: SELECTED_INFO, payload: selectedInfo });
            dispatch(getDataMainChart(mainChart));
            dispatch(getDataTableHome(tableHome));
            dispatch(getDataTop(topChart));
        }
    }
}


function getDataMainChart(geoURL){
    return async (dispatch) => {
        dispatch({ type: GET_MAIN_CHART_REQUEST });
        try {
            const mainChart = await axios.get(geoURL);
            dispatch({ type: GET_MAIN_CHART_SUCCESS, payload: mainChart.data });   
        } catch (error) {
            dispatch({ type: GET_MAIN_CHART_FAILURE, payload: error });
        }
    }
}

function getDataTableHome(geoURL){
    return async (dispatch) => {
        dispatch({ type: GET_TABLE_HOME_REQUEST });
        try {
            const tableHome = await axios.get(geoURL);
            dispatch({ type: GET_TABLE_HOME_SUCCESS, payload: tableHome.data });   
        } catch (error) {
            dispatch({ type: GET_TABLE_HOME_FAILURE, payload: error });
        }
    }
}


function getDataTop(geoURL){
    return async (dispatch) => {
        dispatch({ type: GET_TOP_REQUEST });
        try {
            const chart1 = await axios.get(geoURL[0]);
            const chart2 = await axios.get(geoURL[1]);
            const dataTop = {
                chart1: chart1.data, 
                chart2: chart2.data
            };
            
            dispatch({ type: GET_TOP_SUCCESS, payload: dataTop });   
        } catch (error) {
            dispatch({ type: GET_TOP_FAILURE, payload: error });
        }
    }
}