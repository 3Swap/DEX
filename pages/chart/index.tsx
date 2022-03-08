import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components';
import Chart from '../../components/Chart/Chart';


interface Props {
    
}

const ChartContainer = styled('div')`

    width: 920px;

    transition-duration: 1s;




    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
    box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
    backdrop-filter: blur(19px);
    border-radius: 20px;
  

`;





const TokenImg = styled('img')`
    width: 25px;
    height: 25px;
    
    @media (max-width: 960px) {
        width: 20px;
        height: 20px;
    }
`;



const ChartTitle = styled('div')`
    width: 100%;

    height: 50px;
    font-family: Poppins;
    padding-left: 35px;

     color: white;
     display: flex;
     flex-direction: row;
     align-items: center;
     gap: 10px;

     .swap{
         cursor: pointer;
         width: 30px;
         margin-left: 5px;
         transition-duration: 250ms;
         &:hover{
             transform: scale(1.1);
         }
     }

`;

export default function ChartComponent({}: Props): ReactElement {
    const [chartData,setChartData] =  useState(null);


 
  
    const [changeIn24h,setChangeIn24h] =useState<string>("9999999");

    const [tabId, setTabId] = useState(0);


    const [selectedPair,setSelectedPair] = useState("BNB/USDT");

  
  
  
    const getETHKlineBinanceAPI5Min = ()=>{
      axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=5m&limit=288`).then((res:any)=>{
        
       
        const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
             let h=time.getUTCHours();
            let pm=false;
            if(h>=12){
                pm=true;
                h=h-12;
            }
            let m =time.getUTCMinutes();
            let y = time.getUTCFullYear().toString().substring(2);
            let month = time.toUTCString().substring(8,12);
            let day = time.getUTCDate();let customDate;
            if(pm){
                if(m>=10){
                    customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
                else{
                    customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
               
            }
            else{
                if(m>=10){
                    customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
                }
                else{
                    customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
            }
            

          return {"name":customDate,"pv":parseInt(data[1]),"amt":new Date(data[0]+3600000).toUTCString().split(" ")[4].substring(0,5)};
        })

     

        let change24h = filterList[287].pv-filterList[0].pv;
        let percentChange = (change24h/filterList[0].pv)*100;
      
        let changeString = change24h+" ("+percentChange.toFixed(2)+" %)";


       


        setChangeIn24h(changeString);
  
        setChartData(filterList);
      })
    
    }
  
    const getETHKlineBinanceAPI1Hr = ()=>{
      axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=1h&limit=168`).then((res:any)=>{
        const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
             let h=time.getUTCHours();
            let pm=false;
            if(h>=12){
                pm=true;
                h=h-12;
            }
            let m =time.getUTCMinutes();
            let y = time.getUTCFullYear().toString().substring(2);
            let month = time.toUTCString().substring(8,12);
            let day = time.getUTCDate();let customDate;
            if(pm){
                if(m>=10){
                    customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
                else{
                    customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
               
            }
            else{
                if(m>=10){
                    customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
                }
                else{
                    customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
            }

          return {"name":customDate,"pv":parseInt(data[1]),"amt":new Date(data[0]+3600000).toUTCString().split(",")[0]};
        })
      
    
        setChartData(filterList);
      })
    
    }
    
    const getETHKlineBinanceAPI12Hr = ()=>{
      axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=12h&limit=500`).then((res:any)=>{
        
        const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
            let h=time.getUTCHours();
           let pm=false;
           if(h>=12){
               pm=true;
               h=h-12;
           }
           let m =time.getUTCMinutes();
           let y = time.getUTCFullYear().toString().substring(2);
           let month = time.toUTCString().substring(8,12);
           let day = time.getUTCDate();let customDate;
           if(pm){
               if(m>=10){
                   customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
              
           }
           else{
               if(m>=10){
                   customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
           }

          return {"name":customDate,"pv":parseInt(data[1]),"amt":parseInt(data[1])};
        })
      

        setChartData(filterList);
      })
    
    }
    
    const getETHKlineBinanceAPI1Day = ()=>{
      axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=1d&limit=500`).then((res:any)=>{
        const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
             let h=time.getUTCHours();
            let pm=false;
            if(h>=12){
                pm=true;
                h=h-12;
            }
            let m =time.getUTCMinutes();
            let y = time.getUTCFullYear().toString().substring(2);
            let month = time.toUTCString().substring(8,12);
            let day = time.getUTCDate();let customDate;
            if(pm){
                if(m>=10){
                    customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
                else{
                    customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
               
            }
            else{
                if(m>=10){
                    customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
                }
                else{
                    customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
                }
            }
        
          return {"name":customDate,"pv":parseInt(data[1]),"amt":new Date(data[0]+3600000).toUTCString().split(",")[0]};
        })
         

        setChartData(filterList);
      })
    }
    
    const oneMonthGraph = ()=>{
      axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=4h&limit=180`).then((res:any)=>{
        
        const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
            let h=time.getUTCHours();
           let pm=false;
           if(h>=12){
               pm=true;
               h=h-12;
           }
           let m =time.getUTCMinutes();
           let y = time.getUTCFullYear().toString().substring(2);
           let month = time.toUTCString().substring(8,12);
           let day = time.getUTCDate();let customDate;
           if(pm){
               if(m>=10){
                   customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
              
           }
           else{
               if(m>=10){
                   customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
           }

          return {"name":customDate,"pv":parseInt(data[1]),"amt":new Date(data[0]+3600000).toUTCString().split(",")[1].substring(1,8)};
        })
  

        setChartData(filterList);
      })
    }
    
    const getETHKlineBinanceAPI1Week = ()=>{
      axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=1w&limit=500`).then((res:any)=>{
    
        const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
            let h=time.getUTCHours();
           let pm=false;
           if(h>=12){
               pm=true;
               h=h-12;
           }
           let m =time.getUTCMinutes();
           let y = time.getUTCFullYear().toString().substring(2);
           let month = time.toUTCString().substring(8,12);
           let day = time.getUTCDate();let customDate;
           if(pm){
               if(m>=10){
                   customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
              
           }
           else{
               if(m>=10){
                   customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
           }

          return {"name":customDate,"pv":parseInt(data[1]),"amt":new Date(data[0]+3600000).toUTCString().split(",")[1].substring(1,12).substring(6)};
        })
  
   
        setChartData(filterList);
      })
    }

    const oneYearPlot = ()=>{
        axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=3d&limit=122`).then((res:any)=>{
      
          const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
            let h=time.getUTCHours();
           let pm=false;
           if(h>=12){
               pm=true;
               h=h-12;
           }
           let m =time.getUTCMinutes();
           let y = time.getUTCFullYear().toString().substring(2);
           let month = time.toUTCString().substring(8,12);
           let day = time.getUTCDate();let customDate;
           if(pm){
               if(m>=10){
                   customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
              
           }
           else{
               if(m>=10){
                   customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
           }
  
            return {"name":customDate,"pv":parseInt(data[1]),"amt":new Date(data[0]+3600000).toUTCString().split(",")[1].substring(1,7)+" "+new Date(data[0]+3600000).toUTCString().substring(14,16)};
          })
    
  
          setChartData(filterList);
        })
      }
    
    const getETHKlineBinanceAPI1Month = ()=>{
      axios.get(`${process.env.BINANCE_API}klines?symbol=${selectedPair.split("/")[0]+selectedPair.split("/")[1]}&interval=1M&limit=48`).then((res:any)=>{
        const filterList= res.data.map((data:any)=>{
            let time = new Date(data[0]+3600000);
            let h=time.getUTCHours();
           let pm=false;
           if(h>=12){
               pm=true;
               h=h-12;
           }
           let m =time.getUTCMinutes();
           let y = time.getUTCFullYear().toString().substring(2);
           let month = time.toUTCString().substring(8,12);
           let day = time.getUTCDate();let customDate;
           if(pm){
               if(m>=10){
                   customDate = h+":"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"PM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
              
           }
           else{
               if(m>=10){
                   customDate = h+":"+m+"AM "+day+" "+month.toUpperCase() +" "+y+", CET"; 
               }
               else{
                   customDate = h+":0"+m+"AM "+day+" "+month.toUpperCase()+" "+y+", CET"; 
               }
           }

          return {"name":customDate,"pv":parseInt(data[1]),"amt":new Date(data[0]+3600000).toUTCString().substring(12,16)};
        })
  
     
        setChartData(filterList);
      })
    }
  
    
    useEffect(()=>{
        getETHKlineBinanceAPI5Min();
        setTabId(0);
        
      },[selectedPair]);

    //   const SwapChartTokens = ()=>{
    //       setSelectedPair("USDT/ETH");
    //   }

      
    return (
        
        <ChartContainer>
            <ChartTitle>
                    <TokenImg  src={'./bnb.svg'} alt='bnb'/>
                    <TokenImg src={'/usdt.webp'} alt='usdt' />
                    {selectedPair}
                    <img src='./swapIcon.svg' className='swap' ></img>
            </ChartTitle>
            <Chart setCurrSymbolPrice={null} selectedPair={selectedPair} setSelectedPair={setSelectedPair} changeIn24h={changeIn24h} oneDayGraph={getETHKlineBinanceAPI5Min} sevenDayGraph={getETHKlineBinanceAPI1Hr} oneMonthGraph={oneMonthGraph} oneYearGraph={oneYearPlot} maxGraph={getETHKlineBinanceAPI1Month} tabId={tabId} setTabId={setTabId} value="5932070" data={chartData} />
        </ChartContainer>
        
    )
}
