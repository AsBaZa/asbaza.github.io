////////////////////////////////////////////////////////////////
//Verify that options are reseted when the window is refreshed//
////////////////////////////////////////////////////////////////

//Reset 'clustering_type' button
document.getElementsByName("clustering_type")[0].checked = true;

//Reset 'upper-select' buttons to 'All'
document.getElementById("input_cluster").value = "denak";
document.getElementById("input_category").value = "denak";
document.getElementById("input_province").value = "denak";
document.getElementById("input_stratum").value = "denak";


(function () {
  //Create ClusterPlot element in 'clusterplot' <div>
  plot = new ClusterPlot('clusterplot');
  //Create CategoryPlot element in 'categoryplot' <div>
  plot2 = new CategoryPlot('categoryplot');
  //Create StratumPlot element in 'stratumplot' <div>
  plot3 = new StratumPlot('stratumplot');
  //Create HeatMap element in 'heatmap' <div>
  heat = new HeatMap();


  //Add interaction when 'clustering_type' element is changed
  Array.from(document.getElementsByName("clustering_type")).map(function(x){
    x.addEventListener("change",function(){
      //Restart every 'upper-select' elements to 'All' and
      //change the cluster type.
      [plot,plot2,plot3,heat].map(function(y){
        [y.select1,y.select2,y.select3,y.select4].map(function(z){
          z.value = "denak";
        });
        y.selectedClus = x.value;
      });

      //Repaint categoryplot, stratumplot and heatmap
      plot2.paint();
      plot3.paint();
      heat.paintStratum();
      //Repaint clusterplot
      x.value === "CLUSTERABS" ? plot.paint(dfABS) :
      x.value === "CLUSTERNOR" ? plot.paint(dfNOR) : plot.paint(dfALD);

      //Change 'clustering_type_selector', the select button that is
      //hidden in big screens.
      document.getElementById("clustering_type_selector").value = x.value;

      //If Absolute Price is selected, add 3 options
      if (x.value === "CLUSTERABS"){
        ["5","6"].map(function(y){
          option = document.createElement("option");
          option.text = y;
          option.value = y;
          document.getElementById("input_cluster").add(option);
        });
      }
      //Else, delete 3 options
      else{
        [6,5].map(function(y){
          document.getElementById("input_cluster").remove(y);
        });
      }
    });
  });

  //Repaint charts when a 'upper-select' element is changed
  Array.from(document.getElementsByClassName("upper-select")).map(function(x){
    x.addEventListener("change",function(){
      plot.paint();
      plot2.paint();
      plot3.paint();
      heat.paintStratum();
    });
  });

  //Interaction with 'clustering_type_selector' element. This element appears
  //in small screens. When the value is changed, that will also change
  //'clustering_type' button interacting with the charts.
  document.getElementById("clustering_type_selector").addEventListener("change", function(){
    if (document.getElementById("clustering_type_selector").value === "CLUSTERABS"){
      document.getElementsByName("clustering_type")[0].click();
    }
    else if (document.getElementById("clustering_type_selector").value === "CLUSTERNOR"){
      document.getElementsByName("clustering_type")[1].click();
    }
    else {
      document.getElementsByName("clustering_type")[2].click();
    }
  });

  //Resize the width of 'plot' element when screen/window size is updated
  window.onresize = function() {
    width_plot = 695;
    if (window.innerWidth < 1100 && window.innerWidth > 1030){
      width_plot = window.innerWidth - 400;
    }
    else if (window.innerWidth <= 1030 && window.innerWidth > 650){
      width_plot = (window.innerWidth - 20) * 0.94;
    }
    else if (window.innerWidth <= 650){
      width_plot = 588;
    }
    Plotly.relayout(plot.element,{
      width:  width_plot
    });
  };
} ());
