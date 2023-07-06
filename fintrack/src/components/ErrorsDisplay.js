
const ErrorsDisplay = ({ errors }) => {

    let errorsToDisplay = null
  
    if (errors.length) {
        errorsToDisplay = (
        <div>
          <h2 className=''>Errors</h2>
          <div className=''>
            <ul>
              { errors.map((error, i) => <li key={i}>{error}</li>) }
            </ul>
          </div>
        </div>
      )
    }
    return errorsToDisplay
  }
  
  export default ErrorsDisplay