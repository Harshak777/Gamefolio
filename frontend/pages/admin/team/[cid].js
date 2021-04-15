import { useRouter } from 'next/router'
import Layout from "../../../components/Layout";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Router from 'next/router';
import Modal from 'react-bootstrap/Modal';

const team = () => {
  const router = useRouter()
  const { cid } = router.query
 return(
     <Layout>
  <p>{cid}</p>
     </Layout>
 );
 

}
export default team;