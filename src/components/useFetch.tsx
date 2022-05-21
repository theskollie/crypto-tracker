import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useFetch = (url : string) => {
  const [data, setData] : [data: any, setData: any] = useState(null);
  const [loading, setLoading] : [loading: boolean, setLoading: any] = useState(false);
  const [error, setError] : [error: any, setError: any] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
        .get(url)
        .then((response) => {
            setData(response.data)
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        })

  }, [url])

  console.log(data);
  return {data, loading, error}

}

export default useFetch