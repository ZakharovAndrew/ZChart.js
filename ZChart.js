/*
 * ZChart - 100 Percent Stacked Bar Chart
 * 
 * @author Zakharov Andrey https://github.com/ZakharovAndrew
 * @version 0.3
 */

var ZChart = function(params) {
    var el = document.querySelector(params['element']);
    
    // default options
    var options = {
        barHeight: '20px',
        barColor1: '#2196F3',
        barColor2: 'green',
        barColor3: '#4CAF50',
        barColor4: 'red'
    };
    
    options = Object.assign(options, params);
    
    console.log(options);

    function arraySum(array) {
	var sum = 0;
	for (var i = 0; i < array.length; i++) {
            if (Object.prototype.toString.call(array[i]) === '[object Number]') {
		sum += array[i];
            }
	}
	return sum;
    }
    
    function arrayMax(array) {
        var maxIndex = 0;
        var maxItem = array[maxIndex];
	for (var i = 1; i < array.length; i++) {
            if (array[i]>array[maxIndex]) {
                maxIndex = i;
            }
	}
	return [maxIndex, maxItem];
    }
    
    function getPercent(number, maxNumber) {
        return Math.floor((number / maxNumber) * 100);
    }
    
    this.init = function () {
        var bodyHtml = '<div class="ZChart">';
        var legendHtml = '';
        
        var chart_data ='';
        
        // chart title
        if (typeof(options.title) !== 'undefined' && options.title !== null) {
            bodyHtml += '<h1>' + options.title + '</h1>';
        }
        
        // chart legend
        if (typeof(options.legend) !== 'undefined' && options.legend !== null) {
            options.legend.forEach(function(element) {
                legendHtml += '<div class="chart-legend"><span></span>'+element+'</div>';
            });
        }
        
        options.dataRow.forEach(function(element) {
            // find sum of all elements
            var sum = arraySum(element.values);
            // sum of all percents
            var sumPercent = 0;
            // for collecting elements of row
            var chartItem = '';
            
            var percentsList = [];
            
            if (sum !== 0) {
                chart_data += '<tr><td>' + element.title + '</td><td width="100%"><div class="chart-row">';

                element.values.forEach(function(item) {
                   var percent = getPercent(item, sum);
                   sumPercent += percent;
                   percentsList.push({item, percent});
                });

                if (sumPercent !== 100) {
                    var aMax = arrayMax(element.values);
                    percentsList[aMax[0]].percent += 100-sumPercent;
                }
                // building main HTML
                percentsList.forEach(function(item) {
                    if (item.percent !== 0) {
                        chartItem += '<div class="chart-item" style="width:'+item.percent+'%;" title="'+element.title+'"><div>'+item.item+'</div></div>';
                    } else {
                        chartItem += '<div class="chart-item" style="width:'+item.percent+'%;" title="'+element.title+'"></div>';
                    }
                });
                // close main DIV
                chart_data += chartItem + '</div></td></tr>';
            }
        });

        bodyHtml += '<div class="chart-legend-row">'+legendHtml+'</div><table width="100%" border=0 cellspacing="0">' + chart_data + '</table></div>';

        // add CSS style                       
        var sheet = document.createElement('style');
        sheet.innerHTML =  
            options.element + " .ZChart {background:#fff;width:100%;text-align:center;}" + 
            options.element + " .ZChart h1 {text-align: center;}"+
            options.element + " .chart-row {width:100%;background-color: white; height:" + options.barHeight + ";}" +
            options.element + " .chart-row .chart-item {height:" + options.barHeight + ";display: table; float:left}" +
            options.element + " .chart-item div {height:100%;width:100%;border: 1px solid white;text-align: center;color:white;line-height:100%; display: table-cell; vertical-align: middle;font-size:12px}" +
            options.element + " .chart-item:nth-child(1), " + options.element + " .chart-legend:nth-child(1) span {background:" + options.barColor1 + ";color: #fff;} "+
            options.element + " .chart-item:nth-child(2), " + options.element + " .chart-legend:nth-child(2) span {background:" + options.barColor2 + ";color: #fff;} "+
            options.element + " .chart-item:nth-child(3), " + options.element + " .chart-legend:nth-child(3) span {background:" + options.barColor3 + ";color: #fff;} " + 
            options.element + " .chart-item:nth-child(4), " + options.element + " .chart-legend:nth-child(4) span {background:" + options.barColor4 + ";color: #fff;} "+
            options.element + " .chart-legend span{ height:18px;width:18px;margin-right:5px; display:block; float:left;}"+
            options.element + " .chart-legend {display:table-cell;padding-right:5px;padding-left:5px;font-size:11px;height:18px;line-height:18px;}"+
            options.element + " .chart-legend-row {margin:0 auto;display:table;margin-bottom: 10px;}"+ 
            options.element + " .ZChart tr td:first-child {text-align: right; padding-right:5px;color:#666;font-size: 12px;white-space: nowrap;}";
        document.body.appendChild(sheet);

        el.innerHTML  = bodyHtml;
    };
	
    this.init();
};