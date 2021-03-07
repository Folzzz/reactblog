import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInput, setBlogData } from '../Features/userSlice';

import '../styling/blogs.css'

const Blogs = () => {

    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=812d913fdb58ecfa809e1201bf3c5d5a`;

    const dispatch = useDispatch();

    const [blogContent, setBlogContent] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        axios.get(blog_url)
        .then((response) => {
            dispatch(setBlogData(response.data))
            setBlogContent(response.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
        })
    
    }, [ searchInput ])

    return (
        <div  className="blog__page" >
            <h1 className="blog__page__header">Blogs</h1>
            {
                loading ? <h4 className="loading" >loading...</h4> : ""
            }
            <div className="blogs" >
                {
                    blogContent?.articles?.map(blog => (
                        <a className="blog" target="_blank" href={blog.url} >
                            <img src={blog.image} alt={blog.title} />
                            <div>
                                <h3 className="sourceName" >
                                    <span>{blog.source.name}</span>
                                    <p>{blog.publishedAt}</p>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </a>
                    ))
                }

                {
                    blogContent?.totalArticles == 0 && (
                        <h1 className="no__blogs">No blogs found... search something else</h1>
                    )
                }
            </div>
        </div>
    )
}

export default Blogs
