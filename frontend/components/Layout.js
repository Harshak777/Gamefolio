import Head from 'next/head';
import Navbar from './Navbar';

const Layout = (props) => (
  <div>
    <Head>
      <title>Gamefolio</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
      <meta name="google-signin-scope" content="profile email"></meta>
    <meta name="google-signin-client_id" content="960527555483-09f7mgtkag4eva0n62dl6j6051fp9079.apps.googleusercontent.com"></meta>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
  </div>
);

export default Layout;