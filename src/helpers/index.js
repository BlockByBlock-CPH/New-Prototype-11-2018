export function dataMainChart(data, selectedDay){      
    const dataInfo = data.features;
    let dataMC = {};
    let serie0 = [];
    let serie1 = [];
    let serie2 = [];
    let serie3 = [];
    let serie4 = [];
    let serie5 = [];
    let serie6 = [];
    let serie7 = [];
    let serie8 = [];
    let serie9 = [];
    let serie10 = [];
    let serie11 = [];
    let serie12 = [];
    let serie13 = [];
    let serie14 = [];
    let serie15 = [];
    let serie16 = [];
    let serie17 = [];
    let serie18 = [];
    let serie19 = [];
    let serie20 = [];
    let serie21 = [];
    let serie22 = [];
    let serie23 = [];
    
    //console.log("data: ",data.features[0].geometry.coordinates[0][0]);
    if(selectedDay > 0){    
        dataMC = dataInfo.map(d => {
            return {
                series: d.properties.people,
                labels: d.properties.hours_act,
                title: d.properties.name_day
            }
        });

        //this.setState({ dataMC: dataMC });
        return dataMC;
    }else if(selectedDay === 0){

        dataInfo.forEach(d => {
            const hours = d.properties.hours_act;
            const dataChart = d.properties.people;

            if(hours === 0){
                serie0.push(dataChart);
            }else if(hours === 1){
                serie1.push(dataChart);
            }else if(hours === 2){
                serie2.push(dataChart);
            }else if(hours === 3){
                serie3.push(dataChart);
            }else if(hours === 4){
                serie4.push(dataChart);
            }else if(hours === 5){
                serie5.push(dataChart);
            }else if(hours === 6){
                serie6.push(dataChart);
            }else if(hours === 7){
                serie7.push(dataChart);
            }else if(hours === 8){
                serie8.push(dataChart);			
            }else if(hours === 9){
                serie9.push(dataChart);
            }else if(hours === 10){
                serie10.push(dataChart);
            }else if(hours === 11){
                serie11.push(dataChart);
            }else if(hours === 12){
                serie12.push(dataChart);
            }else if(hours === 13){
                serie13.push(dataChart);			
            }else if(hours === 14){
                serie14.push(dataChart);
            }else if(hours === 15){
                serie15.push(dataChart);
            }else if(hours === 16){
                serie16.push(dataChart);
            }else if(hours === 17){
                serie17.push(dataChart);
            }else if(hours === 18){
                serie18.push(dataChart);
            }else if(hours === 19){
                serie19.push(dataChart);
            }else if(hours === 20){
                serie20.push(dataChart);
            }else if(hours === 21){
                serie21.push(dataChart);
            }else if(hours === 22){
                serie22.push(dataChart);
            }else if(hours === 23){
                serie23.push(dataChart);
            }
        });
        
        serie0 = Object.assign({},serie0);
        serie1 = Object.assign({},serie1);
        serie2 = Object.assign({},serie2);
        serie3 = Object.assign({},serie3);
        serie4 = Object.assign({},serie4);
        serie5 = Object.assign({},serie5);
        serie6 = Object.assign({},serie6);
        serie7 = Object.assign({},serie7);
        serie8 = Object.assign({},serie8);
        serie9 = Object.assign({},serie9);
        serie10 = Object.assign({},serie10);
        serie11 = Object.assign({},serie11);
        serie12 = Object.assign({},serie12);
        serie13 = Object.assign({},serie13);
        serie14 = Object.assign({},serie14);
        serie15 = Object.assign({},serie15);
        serie16 = Object.assign({},serie16);
        serie17 = Object.assign({},serie17);
        serie18 = Object.assign({},serie18);
        serie19 = Object.assign({},serie19);
        serie20 = Object.assign({},serie20);
        serie21 = Object.assign({},serie21);
        serie22 = Object.assign({},serie22);
        serie23 = Object.assign({},serie23);
        const labels = Object.assign({},['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
        const title = Object.assign({},['Week']);
        dataMC = {
            series: {
                serie0,serie1,serie2,serie3,serie4,serie5,serie6,serie7,serie8,serie9,serie10,serie11,serie12,serie13,serie14,
                serie15,serie16,serie17,serie18,serie19,serie20,serie21,serie22,serie23},
            labels,
            title
            };
        //this.setState({ dataMC: dataMC });
        return dataMC;
    }        
}


export function dataTableHome(data,selectedDay){      
    const dataInfo = data.features;
    let dataTH = {};
    let th = {};
    let td = {};
    let id = 0;
    
    if(selectedDay > 0){
        td = dataInfo.map(d => {
            id += 1; 
            return {
                id: id,
                day:d.properties.name_day,
                hour:d.properties.hours_act,
                people:d.properties.count_act
            };
        });
        th = ['','Day','Hour', '# People'];
        dataTH = {td, th}
    }else if(selectedDay === 0){
        td = dataInfo.map(d => {
            id += 1;
            return {
                id: id,
                day: d.properties.name_day,
                people: d.properties.people
            }        
        });
        th = ['','Day', '# People'];
        dataTH = {td, th};
    }

    // this.setState({ dataTH: dataTH });
    return dataTH;
}


export function dataTop(data){      
    const dataInfo1 = data.chart1.features;
    const dataInfo2 = data.chart2.features;
    let dataChartTop1 = {};
    let dataChartTop2 = {};
              
    dataChartTop1 = dataInfo1.map(d => {
        return {
            labels: d.properties.id,
            series: d.properties.people,
            title: 'Top Max People by Zone'
        }
    });

    dataChartTop2 = dataInfo2.map(d => {
        return {
            labels: d.properties.id,
            series: d.properties.people,
            title: 'Top Min People by Zone'
        }
    });
    
    //this.setState({ dataTop: { dataChartTop1, dataChartTop2 }});
    return { dataTop: { dataChartTop1, dataChartTop2 }};
}