"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Image from 'next/image';

const FeaturedPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts using Axios
        axios.get(`${process.env.NEXT_PUBLIC_BASE_POST_URL}`, {
            params: {
                per_page: 6,
                _embed: true
            }
        })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <section className="our-services-item-section">
            {/* <h2 className="text-center mb-4">Featured Posts</h2> */}
            <div className="container">
                <div className="row">
                    {posts.map(post => {
                        const featuredMedia = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
                        const featuredImageUrl = featuredMedia ? featuredMedia.source_url : '';

                        return (
                            <div className="col-md-4 mb-4" key={post.id}>
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            {featuredImageUrl && (
                                                <Image src={featuredImageUrl} alt={featuredMedia.alt_text || post.title.rendered} className="card-img-top"  layout="responsive" width={100} height={100} />
                                            )}
                                            <h3 className="card-title">{post.title.rendered}</h3>
                                        </div>
                                        <div className="flip-card-back">
                                            <div className="card-text" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                            <a href={`/blog/${post.slug}`} className="btn">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturedPost;
