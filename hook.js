//custom fetch hook for the four most basic fetch calls with authentication and notification
export const useFetch = (url) => {
  const token;
  const [data, setData] = useState({})
  const [error, setError] = useState("")
  const [contentType, setContentType] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [toastmsg, setToastmsg] = useState('')
  let [fetchUrl, setFetchUrl] = useState(url)
  const controller = new AbortController()
  const { signal } = controller


  useEffect(() => {
    let loader;
    isFetching ? loader = toast.loading('We are working on it...', { position: 'top-center' }) : toast.dismiss(loader);
  }, [isFetching])

  useEffect(() => {
    let popup;
    toastmsg && (popup = toast(toastmsg, { position: 'top-center' }))
    setToastmsg('')
  }, [toastmsg])

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  let options = {
    signal,
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Access-Control-Max-Age': 9000,
      Authorization: `Bearer ${token}`,
      accept: '*/*',
      'Content-Type': contentType ? contentType : 'application/json'
    }
  }
  const allCalls = (type, params, body) => {
    switch (type) {
      case 'get':
        typeof params === 'object' ? fetchUrl += (new URLSearchParams(params)).toString() : fetchUrl += "/" + params;
        break;
      case 'post':
        options.method = 'POST'
        options.body = JSON.stringify(body);
        break;
      case 'put':
        options.method = 'PUT'
        options.body = JSON.stringify(body);
        break;
      case 'delete':
        options.method = 'DELETE'
        typeof params === 'object' ? fetchUrl += (new URLSearchParams(params)).toString() : fetchUrl += "/" + params;
        break;
      default:
        break;
    }

    setIsFetching(true);


    fetch(fetchUrl, options)

      .then(res => {
        switch (res.status) {
          case 200:
            return res.json();
          case 204:
            setError('Deleted Successfully');
            setToastmsg('Deleted Successfully')
            break;
          default:
            return res.json()
              .then(json => {
                setIsFetching(false);
                setError(json.message);
                setToastmsg(json.message)
              })
        }
      })

      .then((json) => {
        setIsFetching(false);
        json && setToastmsg('Success')
        return json && setData(json)
      })

      .catch((err) => {
        setIsFetching(false);
        setError('Please check your internet connection, If that fails to solve the problem log in again')
        setToastmsg('Please check your internet connection, If that fails to solve the problem log in again')
      })

  }

  const get = (params) => { allCalls('get', params) }
  const post = (body) => { allCalls('post', '', body) }
  const deleter = (params) => { allCalls('delete', params) }
  const put = (body) => { allCalls('put', '', body) }

  const setUrl = useCallback((param) => setFetchUrl(`${GLOBAL_URL}${param}`), [])


  return { data, error, get, post, deleter, put, setError, setData, isFetching, setIsFetching, setUrl, setContentType }
}
