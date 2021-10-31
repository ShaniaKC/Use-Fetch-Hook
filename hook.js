export const useFetch = ( url ) => {
    const { token } = useContext( UserContext );
    const [ data, setData ] = useState( {} )
    const [ error, setError ] = useState( "" )
    const [ isFetching, setIsFetching ] = useState( false )
    let [fetchUrl, setFetchUrl] = useState(url)
    let controller = new AbortController()
    
  
    useEffect(() => {
      let loader;
      isFetching ? loader = toast.loading('We are working on it...', {position: 'top-center'}) : toast.dismiss(loader);
    }, [isFetching])
  
    
  
  
    let options = {
      signal: controller.signal,
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Max-Age' : 9000,
        Authorization: `Bearer ${ token }`,
        accept: '*/*',
        'Content-Type': 'application/json'
      }
    }
    const allCalls = ( type, params, body ) => {
      switch ( type )
      {
        case 'get':
          typeof params === 'object' 
          ? fetchUrl += ( new URLSearchParams( params ) ).toString() 
          : fetchUrl += "/" + params;
          break;
        case 'post':
          options.method = 'POST'
          options.body = JSON.stringify( body );
          break;
        case 'put':
          options.method = 'PUT'
          options.body = JSON.stringify( body );
          break;
        case 'delete':
          options.method = 'DELETE'
          typeof params === 'object' 
          ? fetchUrl += ( new URLSearchParams( params ) ).toString() 
          : fetchUrl += "/" + params;
          break;
        default:
          break;
      }
  
    setIsFetching( true );
  
    
    fetch(fetchUrl, options )
  
    .then( res => {
      
          switch(res.status)  {
            case 200: 
            return  res.json() ;
            case 204:
              setError('Deleted Successfully');
              toast('Deleted Successfully', {position : 'top-center'})
              break;
            default: 
            return res.json()
            .then( json => {
              setIsFetching( false );
              setError( json.message );
              toast(json.message, {position: 'top-center'})
            })
          }
    })
  
    .then( (json) => { 
        setIsFetching( false );
        json && toast('Success', {position: 'top-center'});
        return json && setData( json )
    } )
  
    .catch((err) => {
      setIsFetching( false );
      setError('Please check your internet connection, If that fails to solve the problem log in again')
      toast('Please check your internet connection, If that fails to solve the problem log in again', {position: 'top-center'})
      })
    }
  
    const get = ( params ) => { allCalls( 'get', params ) }
    const post = ( body ) => { allCalls( 'post', '', body ) }
    const deleter = ( params ) => { allCalls( 'delete', params ) }
    const put = ( body ) => { allCalls( 'put', '', body ) }
  
    const setUrl = useCallback( ( param ) => setFetchUrl( param ), [] )
   
    return { data, error, get, post, deleter, put, setError, setData, isFetching, setIsFetching, setUrl, controller}
  }
  
  