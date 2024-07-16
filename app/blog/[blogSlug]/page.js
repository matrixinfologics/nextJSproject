"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

import Header from '../../lib/Header'; // Adjusted import path
import Footer from '../../lib/Footer'; // Adjusted import path
import Image from 'next/image';

const BlogPage = ({ params }) => {
    const { blogSlug } = params; // Get the blogSlug from the URL

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/posts?slug=${blogSlug}`);
                setContent(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [blogSlug]);

    if (loading) return <div className="loader"><Image src="http://122.160.55.196:4344/matrixtraining/wp-content/uploads/2024/05/cupertino_activity_indicator_square_medium.gif" alt="Loading" width={100} height={100} /></div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <Header />
        <div className="blog-details container">
            {content && content.map(post => (
                <div key={post.id}>
                           <h2>{post.title.rendered}</h2>
                           <p>Author: {post.author} - Date: {new Date(post.date).toLocaleDateString()}</p>
                           <div>{parse(post.content.rendered)}</div>

                </div>
            ))}
        </div>
         <Footer />
         </>
    );
};

export default BlogPage;
