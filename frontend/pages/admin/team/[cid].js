import { useRouter } from 'next/router'
import Layout from "../../../components/Layout";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Router from 'next/router';
import Modal from 'react-bootstrap/Modal';

const team = () => {
  const router = useRouter()
  const { cid } = router.query

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(async () => {
    if(isLoading)
      await axios(
        `http://localhost:5000/fetchteam/${cid}`
      )           .then(result => {
        const sorteddata= result.data.sort(function(a, b){return a.tid - b.tid});
        setData(sorteddata)
        setIsLoading(false)
        console.log(sorteddata)
    })
    .catch(err => {
        console.log(err);
    });
    
   
  });

  return(
    <p>loading</p>
  )
 

}
export default team;