import Head from 'next/head'
import React from 'react'
import Dashboard from '../components/Dashboard'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Spotify Rivari</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  )
}
