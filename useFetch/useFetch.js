import {useState, useEffect} from 'react'

const localCache = {
      
}

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    })

    useEffect(() => {
      
        getFech();
    }, [url])

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true, 
            hasError: false,
            error: null,
        })
    } 

    const getFech = async() => {

        if(localCache[url]){
            console.log('usando caché')
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return
        }
        setLoadingState();
        const response = await fetch(url)
        //Sleep

        await new Promise(resolve => setTimeout(resolve,500))
        if(!response.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: response.status,
                    message: response.statusText,
                }
            });
            return;
        }


        const data = await response.json();
        setState({
            data: data,
            isLoading: false, 
            hasError: false,
            error: null,
        })

        localCache[url] = data

        //TODO: MANEJO DEL CACHE
        console.log(data)
    }
    
     
return{
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError
}   
}
