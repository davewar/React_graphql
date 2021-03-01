

import React, { useEffect,useState } from 'react'

import { useQuery } from '@apollo/client';
import {GET_BOOK_QUERY} from '../GraphQL/Queries'

const BookDetails = ({bookid}) => {

            // console.log(bookid);

           const { loading, data } = useQuery(GET_BOOK_QUERY,{variables: {id: bookid}});

            const [book, setBook] = useState([])

            useEffect(() => {
                if(data){
                    // console.log("D",data);
                      setBook(data)
                }
              
          
        }, [data]);

      

    if (loading) return <p>Loading....</p>
    

    return (
         <div className="container" id="book-details">

                    {
                        data ? 
                          <div className="row justify-content-center align-items-center text-center p-3  "> 
                                <div className="col-md-6 border">
                                    <h2 >{data.book.name}</h2> 
                                    <p >{data.book.genre}</p>
                                    <p>All books by this author: {data.book.author.name}</p>
                                    <ul className="list-group mb-1">
                                        {data.book.author.books.map((item) => {
                                            return <li className="list-group-item list-group-item-primary " key={item.id}>{item.name}</li>;
                                        })}
                                    </ul>
                               </div>      
                        </div>   
                        : null
                        
                    }

                {/* <p>Click on book Name</p> */}
            </div>
    )
}

export default BookDetails
