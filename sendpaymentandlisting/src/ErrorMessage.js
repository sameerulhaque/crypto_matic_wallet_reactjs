export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <div className="alert alert-error mt-5">
        
          <label>{message}</label>
      </div>
    );
  }
  