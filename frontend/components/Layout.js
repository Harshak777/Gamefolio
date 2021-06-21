import Head from 'next/head';
import Navbar from './Navbar';
import 'tailwindcss/tailwind.css'

const Layout = (props) => (
  <div>
    <Head>
      <title>Gamefolio</title>
       {/* <link rel="stylesheet" href="https://bootswatch.com/4/Cyborg/bootstrap.min.css"/> */}
      <meta name="google-signin-scope" content="profile email"></meta>
    <meta name="google-signin-client_id" content="960527555483-09f7mgtkag4eva0n62dl6j6051fp9079.apps.googleusercontent.com"></meta>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    </Head>
    <div className="container-fluid main-canvas p-0 min-vh-100">
      <div className="inner-canvas">
        <Navbar login={props.login}/>
        {props.children}
      </div>
    </div>
  </div>
);

export default Layout;