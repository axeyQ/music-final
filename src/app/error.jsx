const ErrorPage = ({error}) => {
    return ( 
        <div>
            <h1>{error.message}</h1>
        </div>
    );
}
 
export default ErrorPage;