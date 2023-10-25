
import "Assets/css/current-statistics-results.css";
import * as bootstrap from "bootstrap";
import Chart from 'chart.js/auto';

export default class V_CurrentStatisticsResults {

  /**
   * Constructor, get and initialize the element
   */
  constructor() {

    // Get the modal elements
    this.resultsModalEl = document.getElementById("results-modal");
    this.resultsModal = new bootstrap.Modal('#results-modal', { 'focus': false });

    // Get the pie chart elements
    this.pieScoreEl = this.resultsModalEl.querySelector("#results-pie-score canvas");

  }




  populateResultsModal(data) {
    console.log(data)

  }


  showModal() {

    this.resultsModal.show();


    let chart = new Chart(this.pieScoreEl, {
      type: 'doughnut',
      data: {
        /* labels: ['Red', 'Blue'], */
        labels: ['Correct answers', "Wrong answers"],
        datasets: [{

          

          borderColor: 'red',
          data: [0, 1],
          backgroundColor: [
            '#4865d6',
            /* '#e83c4b', */
            '#ddd',

          ],          
          hoverBackgroundColor: ['#4865d6', '#ddd'],
          borderWidth: 0,
          
          spacing: 0,
          hoverOffset: 10,
          hoverBorderRadius: 5,
          

        }],
      },

      options: {
        cutout: '70%',        
        layout: {
          padding: 10,
      },
        responsive: true,
        animation: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgb(255, 99, 132)'
            }
          },
          tooltip: {
            label: ["one", "two"],
            borderWidth: 100,
            displayColors: false,
            callbacks: {
              label: () => { return "70%" },
            }
          },
        },


        /*
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
        */
      }

    });

    setTimeout(() => {

      //chart.options.animation = true;
      chart.options.animation = {duration : 1000};
      chart.data.datasets[0].data = [0.7, 0.3];

      chart.update();
      console.log(chart)

    }, 10)


  }

  tooltip(tooltipItems) {
    console.log(tooltipItems);
    return "coucou";
  }
}




