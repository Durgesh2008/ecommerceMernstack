import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
// @ts-ignore
import Helmet from 'react-helmet'



type childrenPros={
    children:ReactNode,
    title:string,
    description:string,
    keywords:string
    
}

const Layout = ({children,title,description,keywords}:childrenPros) => {
  return (
  <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content="Durgesh Kumar"/>
            </Helmet>
<Header/>
<main className='relative'>{children}</main>
<Footer year={new Date().getFullYear()}/>
  </>
  )

}

export default Layout