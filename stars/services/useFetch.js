//this fetchfunction can be like fetch movies
//or maybe like fetch movie details , etc
import {useEffect, useState} from 'react';



const useFetch = (fetchFunction , autoFetch = true) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null)

            const result = await fetchFunction();

            setData(result);

        } catch(err){

            setError(err instanceof Error ? err : new Error('an error occurred'));
        } finally{
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    },[]);

    return { data, loading, error, refetch: fetchData, reset};
}

export default useFetch;