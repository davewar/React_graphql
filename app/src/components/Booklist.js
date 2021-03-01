import React, { useEffect,useState } from 'react'

import { useQuery } from '@apollo/client';
import {GET_BOOKS_QUERY} from '../GraphQL/Queries'
import BookDetails from './BookDetails';


function BookList() {


    const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
    const [bookid, setBookId] = useState("")

    const [books, setBooks] = useState([])

            useEffect(() => {
                if(data){
                    console.log(data);
                      setBooks(data.books)
                }
              
          
        }, [data]);

      

    if (loading) return <p>Loading....</p>
    if (error) return <p>Something went wrong</p>


    return (
        <>
        <div className="row justify-content-center">
            <div className="col-6 ">
            <ul class="list-group ">
            {
                books.map(item=>{
                  
                    return <li className="list-group-item list-group-item-action list-group-item-light" key={item.id} onClick={(e)=>setBookId(item.id)}>{item.name}</li>
                })

            }
             </ul>
            </div>  
            </div>
            <BookDetails bookid={bookid}/>
            </>
           
        
    )
}

export default BookList;