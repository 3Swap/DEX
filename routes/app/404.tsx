import styled from 'styled-components';
import Head from 'next/head';

const Error404 = styled('div')`
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
    justify-content: center;
    margin: 2em auto;
    font-family: 'Poppins';
`
const Text = styled('p')`
    color:#fff;
    font-size:32px;
`

export default function PageNotFound({}){
    return(
        <Error404 className='card'>
            <Head>
                <title>3Swap | Page Not Found</title>
            </Head>
            <Text>404. Page Not Found!</Text>
        </Error404>
    )
}