import Book from "./Book"
const BookSeries = ()=>{

    return(
        <div className="d-flex justify-between w-100">
        <Book title="Goblet of fire" series="Harry potter" genre="#fantasy" author="J.K. Rowling " publish="2000" price="$29.50"/>
        <Book title="Blood of elves" series="Wither" genre="#novel" author="Andrzej Sapkowski" publish="1994" price="$30.43"/>
        <Book title="A Storm of Swords" series="Ice and fire" genre="#heroic" author="George R. R. Martin" publish="1999" price="$32.67"/>
        </div>
    )
}
export default BookSeries