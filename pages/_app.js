import '../styles/global.css'; // Ensure you import the global CSS here
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Client-side only code here
    console.log("App has mounted on the client side.");
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return <Component {...pageProps} />;
}

export default MyApp;
