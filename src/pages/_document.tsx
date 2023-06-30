import Header from '@/components/Header/header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-black/[0.9]'>
       <Header/>
       <Main />
        <NextScript />
      </body>
    </Html>
  )
}
