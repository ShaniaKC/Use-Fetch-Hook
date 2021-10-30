# Use Fetch Hook
 A custom react hook that allows you to minimize repition in a React project that uses a lot of fetch calls with authentication

## How to add this hook to your project
- copy the code in the hook.js file
- create a file in your application named useFetch (You can also add the code to your custom hooks file)

## Example use case : 
    ``
    const NewPatientForm = () => {
    
    const { post, controller } = useFetch( `<your url here>` );
    const [ input, setInput ] = useState( initialState )
    
    useEffect(() => {
        return () => {
          controller.abort()
        }
      },[])

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setI   nput( { ...input, [ name ]: value } )
    }


    const handleSubmit = ( e ) => {
        e.preventDefault();
        post( input );
        
    }

        return (
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name="input" value={input}/>
            </form> 
        )
    }

    export default NewPatientForm
    ``
