import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Center from '../components/center'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div>
    <Head>
    <title>Souldate</title>
    
  </Head>

  <Center />
  </div>


  )
}
export async function getServerSideProps(context){
 
  const session = await getSession(context);
  return{
    props:{
      session
    }
  }
}