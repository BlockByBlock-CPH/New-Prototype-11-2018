import React from 'react';
import { Bar } from 'react-chartjs-2';
import './styles.css';

const BarChart = (props) => {  
    const { dataMC } = props;
    const sizeObject = parseInt(Object.keys(dataMC).length,10);
    let dataset;
    let labels;
    let legend;
    let title;

    if(sizeObject === 3){
        dataset = Object.values(dataMC.series).map((serie, index) => {
            return (   
                {
                    label: ''+index+'',
                    backgroundColor: 'rgba(0,139,139,0.3)',
                    borderColor: 'rgba(0,139,139,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0,139,139,0.7)',
                    hoverBorderColor: 'rgba(0,139,139,1)',
                    data: Object.values(serie).map(s => {return(s)})
                }
            );
        });
        labels = Object.values(dataMC.labels).map(label => {return(label)});
        title = dataMC.title[0];
        legend = false;
    } else {
        dataset = [{
                label: dataMC[0].title,
                backgroundColor: 'rgba(0,139,139,0.3)',
                borderColor: 'rgba(0,139,139,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,139,139,0.7)',
                hoverBorderColor: 'rgba(0,139,139,1)',
                data: dataMC.map(d => {return( d.series)})
            }];
        labels = dataMC.map(d => {return(d.labels)});
        title = dataMC[0].title;
        legend = false;
    }

    const data = {
        labels: labels,
        datasets: dataset        
    };
    
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return '' + value;
                    }
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 10
                }
            }]
        },
        legend: {
            display: legend
        },
        tooltips: {
            enabled: true
        },
        title: {
            display: true,
            text: title
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuint'
        }     
    };
    
    return(
        <Bar
            id="chartBar"
            data={data}
            options={options}
        />
    )
}

export default BarChart;