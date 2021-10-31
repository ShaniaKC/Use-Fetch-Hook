# Use Fetch Hook
 A custom react hook that allows you to minimize repition in a React project that uses a lot of fetch calls with authentication

 This hook uses toast notifications. If you don't have toast installed in your project or you use another notification option you can delete all toast related code

## How to add this hook to your project
- copy the code in the hook.js file
- create a file in your application named useFetch (You can also add the code to your custom hooks file)

## Example use case : 
    ``
    const NewPatientForm = () => {
    
    const { post, controller } = useFetch( `<your url here>` );
    const [ input, setInput ] = useState( initialState )
    
    //cancel the fetch request when component unmounts to avoid memeory leaks
    useEffect(() => {
        return () => {
          controller.abort()
        }
      },[])

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setInput([ name ]: value )
    }


    const handleSubmit = ( e ) => {
        e.preventDefault();
        post( input );
        
    }

        return (
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name="input" value={input}/>
                <input type="submit"/>
            </form> 
        )
    }

    export default NewPatientForm
    ``
## The useFetch return object
The useFetch hook returns an object which can be destructured to get these functions

### get
This function like the post, deleter and put functions takes in a parameter that can be called any where in your code.
when called, a GET request is made to the url entered in as the initial Fetch parameter.

The parameter entered during the fetch call will be coneverted to a `URLSearchParams` string.

### post
This function like the deleter, get and put functions takes in a parameter that can be called any where in your code.
when called, a GET request is made to the url entered in as the initial Fetch parameter.

The parameter entered during the fetch call will be used as the body of the request.

### deleter
This function like the post, get and put functions takes in a parameter that can be called any where in your code.
when called, a GET request is made to the url entered in as the initial Fetch parameter.

The parameter entered during the fetch call will be coneverted to a `URLSearchParams` string.

### put
This function like the deleter, get and post functions takes in a parameter that can be called any where in your code.
when called, a GET request is made to the url entered in as the initial Fetch parameter.

The parameter entered during the fetch call will be used as the body of the request.

### data
This is the response from the server. 

If deleter is used, this returns an empty object


This is useful when the data needs to be displayed as part of the UI


### error
Any error encountered during the fetch request is passed as a string to this variable. 

This is useful when the error needs to be displayed as part of the UI

### setError
sets the error variable. Allows customization of the error variable 

Also useful when the error variable needs to be reset to an empty string

### setData
sets the data variable. Allows customization of the data variable 

Also useful when the data variable needs to be reset to an empty object

### isFetching
returns a boolean that shows the progress of the fetch request

### setIsFetching
sets the is Fetching boolean

### setUrl
Used to change the URL after default URL has been set. 

To be used inside a useEffect hook

### controller
Used to cancel the request when component unmounts

To be used inside a useEffect hook