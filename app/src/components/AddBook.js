
import React, { useEffect,useState } from 'react'

import { useQuery, useMutation } from '@apollo/client';

import {GET_AUTHORS_QUERY, GET_BOOKS_QUERY} from '../GraphQL/Queries'

import {ADD_BOOK_MUTATION} from '../GraphQL/Mutations'


const AddBook = () => {

    
    const [author, setAuthor] = useState([]) /// data from GET_AUTHORS_QUERY
    // input form data
    const [name, setName] = useState('');  
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);   //guery to get authors

          const [addBook ] = useMutation(ADD_BOOK_MUTATION, {refetchQueries:[{query: GET_BOOKS_QUERY}]} ); // after adding book - refetch all books


            useEffect(() => {
                if(data){
                      setAuthor(data.authors)
                    //    console.log("authorUE",data);
                }
               
          
        }, [author]);

      
        const submitForm = (e)=>{
                e.preventDefault()
                if(!authorId || !genre || !name){
                    alert('please complete all fields')
                    return
                }
               
                
                addBook({
                            variables: {
                            name: name,
                            genre: genre,
                            authorId: authorId,
                            },
                            // 
                    });


        }


    if (loading) return <p>Loading....</p>
    if (error) return <p>Something went wrong</p>


    return (

        <div className="container mt-5 ">

            <div className="row">
            <div className="col-6 border">
                    <h1>Add Book</h1>

                    <form  className="m-2" onSubmit={submitForm}>
                             <div className="form-group">
                                <label>Book name:</label>
                                <input className="form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Genre:</label>
                                <input className="form-control" type="text" value={genre} onChange={(e)=>setGenre(e.target.value)} />
                            </div>
                             <div class="form-group">
                                <label>Author:</label>
                                <select className="form-control"   onChange={(e)=>setAuthorId(e.target.value)}>
                                    <option>Select author</option>
                                    {
                                        loading ? <option disabled>Loading authors</option> 
                                        :
                                        author.map(item=>{
                                            // console.log(item);
                                        return <option key={item.id} value={item.id} >{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <button>+</button>

                        </form>

                    </div>
                </div>
            </div>
    )
}

export default AddBook
