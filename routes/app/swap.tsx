import React from 'react'
import styled from 'styled-components'

type Props = {}


const SwapCard = styled('div')`
width: 540px;
height: 846px;
background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
backdrop-filter: blur(19px);
/* Note: backdrop-filter has minimal browser support */

border-radius: 20px;
display: flex;
align-items: center;
flex-direction: column;
justify-content: flex-start;

.title{
  width: 80%;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  height: 27px;


  
 
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 24px;
}

.desc{
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #FFFFFF;
  height: 27px;
  width: 80%;
  margin-top: 10px;
  
}

.text{
  width: 80%;
  margin-top: 50px;
  font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
height: 19px;

color: #F2F2F2;
}


.from{
  width: 460px;
  height: 238px;
  background: #FFFFFF;
border: 1px solid #CEDAFF;
border-radius: 20px;
margin-top: 11px;
display: flex;
flex-direction: column;
align-items: flex-end;
padding-right: 30px;
justify-content: flex-start;

.coin-container{
  width: 402px;
  height: 55px;
  background: #FCFCFC;
border: 1px solid #D8D8D8;
box-sizing: border-box;
border-radius: 20px;
margin-top: 25px;
display: flex;
flex-direction: row;

.left{

  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-family: Poppins;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 24px;
/* or 133% */


/* Color primary */

color: #4500A0;
  
}

.right{

  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 18px;
  font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
/* or 171% */


/* Inactive text color */

color: #9A999C;
  
}

}

.bal{
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  margin-top: 5px;

  color: #9A999C;
}

}


.interchange{
  margin-top: 35px;
}

.text-second{
  width: 80%;
  margin-top: 35px;
  font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
height: 19px;

color: #F2F2F2;
}

.to{
  width: 460px;
  height: 40px;
  background: #FFFFFF;
border: 1px solid #CEDAFF;
border-radius: 20px;
height: 100px;
margin-top: 11px;
display: flex;
flex-direction: column;
align-items: flex-end;
padding-right: 30px;
justify-content: flex-start;

.coin-container{
  width: 402px;
  height: 55px;
  background: #FCFCFC;
border: 1px solid #D8D8D8;
box-sizing: border-box;
border-radius: 20px;
margin-top: 25px;

display: flex;
flex-direction: row;

.left{

  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-family: Poppins;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 24px;
/* or 133% */


/* Color primary */

color: #4500A0;
  
}

.right{

  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 18px;
  font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
/* or 171% */


/* Inactive text color */

color: #9A999C;
  
}
}

}

.btn-disabled{
  width: 460px;
height: 62px;
background: #B1B1B1;
border-radius: 8px;
color: white;
display: flex;
align-items: center;
justify-content: center;
margin-top: 40px;
font-family: Poppins;
font-style: normal;
font-weight: 600;
font-size: 24px;
}



`;

export default function Swap({}: Props) {
  return (
    <SwapCard>
     <div className='title'>
        <div>Swap</div>
        <img src='./settings.svg' style={{cursor:"pointer"}} width={28} height={28}/>
     </div>
     <div className='desc'>
       Swap two tokens for one, pay less.
     </div>

      <div className='text'>From</div>

     <div className='from'>
        <div className='coin-container'>
          <div className='left'>
             <img src='./usdt.svg' style={{cursor:"pointer"}} width={28} height={28}/>
             <div>USDT</div>
             <img src='./down.svg' style={{cursor:"pointer"}} width={12} height={6}/>
          </div>

          <div className='right'>
            <div className='amt'>Enter Amount</div>
            <img src='./max.svg'></img>
          </div>

        </div>

        <div className='bal'>Balance: 0 USDT</div>

        <div className='coin-container'>
          <div className='left'>
             <img src='./eth.svg' style={{cursor:"pointer"}} width={28} height={28}/>
             <div>ETH</div>
             <img src='./down.svg' style={{cursor:"pointer"}} width={12} height={6}/>
          </div>

            <div className='right'>
              <div className='amt'>Enter Amount</div>
              <img src='./max.svg'></img>
            </div>

        </div>

        <div className='bal'>Balance: 0 ETH</div>

     </div>

     <img className='interchange' src='./interchange.svg' />

     <div className='text-second'>To</div>

     
     <div className='to'>
      <div className='coin-container'>
          <div className='left'>
             <img src='./btc.svg' style={{cursor:"pointer"}} width={28} height={28}/>
             <div>BTC</div>
             <img src='./down.svg' style={{cursor:"pointer"}} width={12} height={6}/>
          </div>

          <div className='right'>
             <div className='amt'>Enter Amount</div>
             <img src='./max.svg'></img>
          </div>
      </div>

     </div>

     <div className='btn-disabled'>Swap</div>

    </SwapCard>
  )
}