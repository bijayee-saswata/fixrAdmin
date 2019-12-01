<template>
  <main>
    <div class="container-fluid">

      <div class="welcome">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="content">
                <h2>Welcome to Dashboard</h2>
                <p>Fixr Services at your doorstep.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="error" v-if="error.length  != 0" >{{error}}</div>
      <section class="statistics">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
              <div class="box">
                <i class="fa fa-envelope fa-fw bg-primary"></i>
                <div class="info">
                  <h3>{{numServices}}</h3> <span>Services</span>
                  <!-- <p>Lorem ipsum dolor sit amet</p> -->
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="box">
                <i class="fa fa-file fa-fw danger"></i>
                <div class="info">
                  <h3>{{tranLength}}</h3> <span>Transactions</span>
                  <!-- <p>Lorem ipsum dolor sit amet</p> -->
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="box">
                <i class="fa fa-users fa-fw success"></i>
                <div class="info">
                  <h3>{{usersLength}}</h3> <span>Users</span>
                  <!-- <p>Lorem ipsum dolor sit amet</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="charts">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="chart-container">
                <h3>Chart</h3>
                <canvas id="myChart"></canvas>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chart-container">
                <h3>Chart2</h3>
                <canvas id="myChart2"></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="admins">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="box">
                <h3>Admins:</h3>
                <div class="admin">
                  <div class="img">
                    <img class="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148906966/small/1501685402/enhance" alt="admin">
                  </div>
                  <div class="info">
                    <h3>Joge Lucky</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>

                <div class="admin">
                  <div class="img">
                    <img class="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907019/small/1501685403/enhance" alt="admin">
                  </div>
                  <div class="info">
                    <h3>Joge Lucky</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="box">
                <h3>Moderators:</h3>
                <div class="admin">
                  <div class="img">
                    <img class="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907114/small/1501685404/enhance" alt="admin">
                  </div>
                  <div class="info">
                    <h3>Joge Lucky</h3>
                    <p>Lorem ipsum dolor amet.</p>
                  </div>
                </div>

                <div class="admin">
                  <div class="img">
                    <img class="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance" alt="admin">
                  </div>
                  <div class="info">
                    <h3>Joge Lucky</h3>
                    <p>Lorem ipsum dolor amet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </section>
        <section class='statis text-center'>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <div class="box bg-primary">
                  <i class="fa fa-eye"></i>
                  <h3>5,154</h3>
                  <p class="lead">Page views</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box danger">
                  <i class="fa fa-user-o"></i>
                  <h3>245</h3>
                  <p class="lead">User registered</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box warning">
                  <i class="fa fa-shopping-cart"></i>
                  <h3>5,1</h3>
                  <p class="lead">Product sales</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box success">
                  <i class="fa fa-handshake-o"></i>
                  <h3>5,15</h3>
                  <p class="lead">Transactions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- copyright -->
              <div class="row">
                <div class="col-md-12">
                  <div class="copyright">
                    <p>Copyright © 2019 Fixr. All rights reserved.</p>
                  </div>
                </div>
              </div>
    </div>
  </main>
</template>


<script>
import Chart from 'chart.js';
import {mapState} from 'vuex';
export default {
  name: "dashboard",
  data() {
    return {
      usersLength : 0,
      numServices : 0,
      tranLength: 0,
      error : ''
  }
  },

  computed: mapState('users',['users']),
  mounted() {
      //console.log(users);
    // Start chart

  var chart = document.getElementById('myChart');
  Chart.defaults.global.animation.duration = 2000; // Animation duration
  Chart.defaults.global.title.display = false; // Remove title
  Chart.defaults.global.title.text = "Chart"; // Title
  Chart.defaults.global.title.position = 'bottom'; // Title position
  Chart.defaults.global.defaultFontColor = '#999'; // Font color
  Chart.defaults.global.defaultFontSize = 10; // Font size for every label

  // Chart.defaults.global.tooltips.backgroundColor = '#FFF'; // Tooltips background color
  Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
  Chart.defaults.global.legend.labels.padding = 0;
  Chart.defaults.scale.ticks.beginAtZero = true;
  Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
  Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';

  Chart.defaults.global.legend.display = false;

  new Chart(chart, {
    type: 'bar',
    data: {
      labels: ["January", "February", "March", "April", "May", 'Jul'],
      datasets: [{
        label: "Lost",
        fill: false,
        lineTension: 0,
        data: [45, 25, 40, 20, 45, 20],
        pointBorderColor: "#4bc0c0",
        borderColor: '#4bc0c0',
        borderWidth: 2,
        showLine: true,
      }, {
        label: "Success",
        fill: false,
        lineTension: 0,
        startAngle: 2,
        data: [20, 40, 20, 45, 25, 60],
        // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
        backgroundColor: "transparent",
        pointBorderColor: "#ff6384",
        borderColor: '#ff6384',
        borderWidth: 2,
        showLine: true,
      }]
    },
  });
  //  Chart ( 2 )


  var Chart2 = document.getElementById('myChart2').getContext('2d');
  new Chart(Chart2, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "April", 'May', 'June', 'July', 'Aug'],
      datasets: [{
        label: "My First dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 79, 116)',
        borderWidth: 2,
        pointBorderColor: false,
        data: [5, 10, 5, 8, 20, 30, 20, 10],
        fill: false,
        lineTension: .4,
      }, {
        label: "Month",
        fill: false,
        lineTension: .4,
        startAngle: 2,
        data: [20, 14, 20, 25, 10, 15, 25, 10],
        // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
        backgroundColor: "transparent",
        pointBorderColor: "#4bc0c0",
        borderColor: '#4bc0c0',
        borderWidth: 2,
        showLine: true,
      }, {
        label: "Month",
        fill: false,
        lineTension: .4,
        startAngle: 2,
        data: [40, 20, 5, 10, 30, 15, 15, 10],
        // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
        backgroundColor: "transparent",
        pointBorderColor: "#ffcd56",
        borderColor: '#ffcd56',
        borderWidth: 2,
        showLine: true,
      }]
    },

    // Configuration options
    options: {
      title: {
        display: false
      }
    }
  });

  },

}
</script>


<style lang="css" scoped>
/* Start welcome */

::-webkit-scrollbar {
  background: transparent;
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
main {
  background-color: #2a2b3d;
  }
.welcome {
  color: #CCC;
}
.welcome .content {
  background-color: #313348;
  padding: 15px;
  margin-top: 25px;
}
.welcome h2 {
  font-family: Calibri;
  font-weight: 100;
  margin-top: 0
}
.welcome p {
  color: #999;
}


/* Start statistics */
.statistics {
  margin-top: 25px;
  color: #CCC;
}
.statistics .box {
  background-color: #313348;
  padding: 15px;
  overflow: hidden;
}
.statistics .box > i {
  float: left;
  color: #FFF;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
}
.statistics .box .info {
  float: left;
  width: auto;
  margin-left: 10px;
}
.statistics .box .info h3 {
  margin: 5px 0 5px;
  display: inline-block;
}
.statistics .box .info p {color:#BBB}

/* End statistics */
/* Start charts */
.charts {
  margin-top: 25px;
  color: #BBB
}
.charts .chart-container {
  background-color: #313348;
  padding: 15px;
}
.charts .chart-container h3 {
  margin: 0 0 10px;
  font-size: 17px;
}

/* Start users */

.admins {
  margin-top: 25px;
}

.admins .box > h3 {
  color: #ccc;
  font-family: Calibri;
  font-weight: 300;
  margin-top: 0;
}
.admins .box .admin {
  margin-bottom: 20px;
  overflow: hidden;
  background-color: #313348;
  padding: 10px;
}
.admins .box .admin .img {
  width: 20%;
  margin-right: 5%;
  float: left;
}
.admins .box .admin .img img {
  border-radius: 50%;
}
.admins .box .info {
  width: 75%;
  color: #EEE;
  float: left;
}
.admins .box .info h3 {font-size: 19px}
.admins .box .info p {color: #BBB}

/* End users */
/* Start statis */

.statis {
  color: #EEE;
  margin-top: 15px;
}
.statis .box {
  position: relative;
  padding: 15px;
  overflow: hidden;
  border-radius: 3px;
  margin-bottom: 25px;
}
.statis .box h3:after {
  content: "";
  height: 2px;
  width: 70%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.12);
  display: block;
  margin-top: 10px;
}
.statis .box i {
  position: absolute;
  height: 70px;
  width: 70px;
  font-size: 22px;
  padding: 15px;
  top: -25px;
  left: -25px;
  background-color: rgba(255, 255, 255, 0.15);
  line-height: 60px;
  text-align: right;
  border-radius: 50%;
}

/*chart*/

.main-color {
  color: #ffc107
}
.warning {background-color: #f0ad4e}
.danger {background-color: #d9534f}
.success {background-color: #5cb85c}
.inf {background-color: #5bc0de}

/* Start bootstrap */
.navbar-right .dropdown-menu {
  right: auto !important;
  left: 0 !important;
}
.navbar-default {
  background-color: #6f6486 !important;
  border: none !important;
  border-radius: 0 !important;
  margin: 0 !important
}
.navbar-default .navbar-nav>li>a {
  color: #EEE !important;
  line-height: 55px !important;
  padding: 0 10px !important;
}
.navbar-default .navbar-brand {color:#FFF !important}
.navbar-default .navbar-nav>li>a:focus,
.navbar-default .navbar-nav>li>a:hover {color: #EEE !important}

.navbar-default .navbar-nav>.open>a,
.navbar-default .navbar-nav>.open>a:focus,
.navbar-default .navbar-nav>.open>a:hover {background-color: transparent !important; color: #FFF !important}

.navbar-default .navbar-brand {line-height: 55px !important; padding: 0 !important}
.navbar-default .navbar-brand:focus,
.navbar-default .navbar-brand:hover {color: #FFF !important}
.navbar>.container .navbar-brand, .navbar>.container-fluid .navbar-brand {margin: 0 !important}
@media (max-width: 767px) {
  .navbar>.container-fluid .navbar-brand {
    margin-left: 15px !important;
  }
  .navbar-default .navbar-nav>li>a {
    padding-left: 0 !important;
  }
  .navbar-nav {
    margin: 0 !important;
  }
  .navbar-default .navbar-collapse,
  .navbar-default .navbar-form {
    border: none !important;
  }

}

.navbar-default .navbar-nav>li>a {
  float: left !important;
}
.navbar-default .navbar-nav>li>a>span:not(.caret) {
  background-color: #e74c3c !important;
  border-radius: 50% !important;
  height: 25px !important;
  width: 25px !important;
  padding: 2px !important;
  font-size: 11px !important;
  position: relative !important;
  top: -10px !important;
  right: 5px !important
}
.dropdown-menu>li>a {
  padding-top: 5px !important;
  padding-right: 5px !important;
}
.navbar-default .navbar-nav>li>a>i {
  font-size: 18px !important;
}




/* Start media query */

@media (max-width: 767px) {
  #contents {
    margin: 0 !important
  }
  .statistics .box {
    margin-bottom: 25px !important;
  }
  .navbar-default .navbar-nav .open .dropdown-menu>li>a {
    color: #CCC !important
  }
  .navbar-default .navbar-nav .open .dropdown-menu>li>a:hover {
    color: #FFF !important
  }
  .navbar-default .navbar-toggle{
    border:none !important;
    color: #EEE !important;
    font-size: 18px !important;
  }
  .navbar-default .navbar-toggle:focus, .navbar-default .navbar-toggle:hover {background-color: transparent !important}
}

</style>