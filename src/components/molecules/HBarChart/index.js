import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import './styles.css';


const HorizontalBarChart = (props) => {

    const { dataTop } = props;

    const data = {
        labels: dataTop.map(d => {return(d.labels)}),
        datasets: [
            {
                label: dataTop[0].title,
                backgroundColor: [
                    'rgba(0,139,139,0.2)',
                    'rgba(0,139,139,0.2)',
                    'rgba(0,139,139,0.2)',
                    'rgba(0,139,139,0.2)',
                    'rgba(0,139,139,0.2)'
                ],
                borderColor: 'rgba(0,139,139,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,139,139,0.4)',
                hoverBorderColor: 'rgba(0,139,139,1)',
                data: dataTop.map(d => {return( d.series)})
            }
        ]
    };
    
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // Include a dollar sign in the ticks
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
            display: true
         },
         tooltips: {
            enabled: true
         },
         animation: {
            duration: 1500,
            easing: 'easeInOutQuint'
        }   
    };

    return(
        <HorizontalBar
            id="chartHorzontalBar"
            data={data}
            options={options}
        />
    )
}

export default HorizontalBarChart;