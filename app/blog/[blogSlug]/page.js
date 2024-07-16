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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_POST_URL}?slug=${blogSlug}`);
                setContent(response.data);
                const jsonData = response.data;
                //const ogImageURL = jsonData.og_image[0].url;
                console.log(jsonData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [blogSlug]);

    if (loading) return <div className="loader"><Image src={process.env.NEXT_PUBLIC_LOADER_URL} alt="Loading" width={100} height={100} /></div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <Header />
        <section className="page_title">
                <div className="container">
                    <div className="row">
                        {/* Render the page title */}
                        <>
                            <h1 className="page-title">Blog</h1>
                            <div><div className='heading-bottom-line'></div></div>
                        </>
                    </div>
                </div>
        </section>
        <div className="blog-details container">
            {content && content.map(post => (
                <div key={post.id}>
                    <h2>{post.title.rendered}</h2>
                    {post.yoast_head_json?.og_image?.[0]?.url ? (
                        <div>
                            <Image
                                src={post.yoast_head_json.og_image[0].url}
                                alt={post.title.rendered}
                                width={post.yoast_head_json.og_image[0].width}
                                height={post.yoast_head_json.og_image[0].height}
                            />
                        </div>
                    ) : (
                        <p>No image available</p>
                    )}
                    {/* <p>Author: {post.author} - Date: {new Date(post.date).toLocaleDateString()}</p> */}
                    <div>{parse(post.content.rendered)}</div>
                </div>
            ))}
        </div>
        <Footer />
        </>
    );
};

export default BlogPage;
