import { useRouter } from 'next/router'
import Link from 'next/link';
import Layout from "../../components/Layout";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';


const tournament = () => {
  const router = useRouter()
  const { cid } = router.query




  const [data, setData] = useState({});
  console.log(cid)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const fetchdata = async () => {
      const result = await axios(
        `http://localhost:5000/fetchcontest/${cid}`
      );
      setData(result.data);
      console.log(result.data);
      if(result.data==null)
      setIsLoading(true);
      else
      setIsLoading(false);
    }
    fetchdata();

  }, [cid]);



if(isLoading)
return <p>wait</p>
else{
  return (
    <Layout>
                    <div class="card mb-3" style={{ maxWidth: "20rem" }}>
                        <h3 class="card-header">{data.contestName}</h3>
                        <div class="card-body">
                            <h5 class="card-title">{}</h5>
                            <h6 class="card-subtitle text-muted">organiser:{data.organiser}</h6>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" >
                            <rect width="100%" height="100%" fill="#868e96"></rect>
                            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                        </svg>
                        <div class="card-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Start date: {data.start}</li>
                            <li class="list-group-item">End date : {data.end}</li>
                            <li class="list-group-item">Reward : {data.reward}</li>
                        </ul>
                        <div class="card-footer text-muted">
                            <p class="text-success"><strong>Live</strong></p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary"  onClick={() => {
        Router.push(`/register`)
      }}>Register</button>

    </Layout>

  );
                  }
}

export default tournament

