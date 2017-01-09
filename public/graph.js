function plotGraph() {
    dataid = document.forms[0].type.value;
    // alert("You prefer browsing internet with " + prefer);
    switch (dataid){
      case '1':
        graph(dataid='1',titleName='存款餘額');
        break;
      case '2':
        graph(dataid='2',titleName='外匯餘額');
        break;
    }
} 

graph('1','存款餘額')

function graph(dataid,titleName){
  d3.json(`./deposit?id=${dataid}`,function(data){
    var dataBSP = ['永豐商業銀行'];
    var dataEsun = ['玉山商業銀行'];
    var dataChinaTrust = ['中國信託商業銀行'];
    var dataFubon = ['台北富邦銀行'];
    var dataCatchy = ['國泰世華商業銀行'];
    var dataTai = ['台新國際商業銀行'];
    var dataYun = ['元大商業銀行'];
    var x = ['x'];
    data.forEach(function(d,i){    
      switch(d['銀行別']){
        case '永豐商業銀行':
          dataBSP.push(d['合計']);
          x.push(d['YYYYMM']);
          break;
        case '玉山商業銀行':
          dataEsun.push(d['合計']);
          break;
        case '中國信託商業銀行':
          dataChinaTrust.push(d['合計']);
          break;
        case '台北富邦銀行':
          dataFubon.push(d['合計']);
          break;
        case '國泰世華商業銀行':
          dataCatchy.push(d['合計']);
          break;
        case '台新國際商業銀行':
          dataTai.push(d['合計']);
          break;
        case '元大商業銀行':
          dataYun.push(d['合計']);
          break;
      }      
    });
      
  // graph plot
    var chart = c3.generate({
      bindto:'#chart',
      size:{
        width:1000,
        height:380
      },
      data:{
        x:'x',
        xFormat: '%Y%m',
        columns :[
          x,
          dataBSP,
          dataEsun,
          dataChinaTrust,
          dataFubon,
          dataCatchy,
          dataTai,
          dataYun
        ]
      },
      zoom: {
        enabled: true
      },
      axis:{
        x:{
          type:'timeseries',
          tick:{
            format:'%Y年%m月'
          }
        },
        y:{
          label:{
            text:'百萬元',
            position :'outer-middle'
          },
          tick:{
            format:d3.format("$,") //ADD
          }
        }
      },
      title:{    
        text: titleName
      },
      color: {
        pattern: ['#CC0000', '#99FF99',
                  '#227700', '#66FFFF', 
                  '#FFFF00', '#0000FF', 
                  '#888888', '#ff9896',
                  '#9467bd', '#c5b0d5',
                  '#8c564b', '#c49c94',
                  '#e377c2', '#f7b6d2',
                  '#7f7f7f', '#c7c7c7',
                  '#bcbd22', '#dbdb8d',
                  '#17becf', '#9edae5']
      },
      legend:{
        position:'right'
      }
    });
  });

}
