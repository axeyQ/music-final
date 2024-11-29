const Adsense1 = ({pId}) => {
    return ( 
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
     crossorigin="anonymous"
        strategy="afterInteractive"
     />
     );
}
 
export default Adsense1;