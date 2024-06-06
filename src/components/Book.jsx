const Book = (props) => {
  return (
    <div
      className="w-100 text-center mt-5 border border-secondary rounded mx-5 py-4 .bg-light shadow
"
    >
      <h2 className="my-3 mb-5 ">{props.title}</h2>
      <div className="d-flex flex-column mb-4 px-4">
        <div className="d-flex w-100 justify-content-around">
          <p className="w-50 text-start">Book Series:</p>
          <p className="w-50 text-end">{props.series}</p>
        </div>
        <div className="d-flex w-100 justify-content-around">
          <p className="w-50 text-start">Genre:</p>
          <p className="w-50 text-end">{props.genre}</p>
        </div>
        <div className="d-flex w-100 justify-content-around">
          <p className="w-50 text-start">Author:</p>
          <p className="w-50 text-end">{props.author}</p>
        </div>
        <div className="d-flex w-100 justify-content-around">
          <p className="w-50 text-start">Publish:</p>
          <p className="w-50 text-end">{props.publish}</p>
        </div>
        <div className="d-flex w-100 justify-content-around">
          <p className="w-50 text-start">Price:</p>
          <p className="w-50 text-end">{props.price}</p>
        </div>
      </div>
      <button className="btn btn-secondary ">Shop Now</button>
    </div>
  );
};
export default Book;
