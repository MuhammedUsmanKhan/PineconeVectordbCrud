// import React from 'react';
import { useState, useRef } from "react";
import axios from "axios";

const Createpostcard = ({ createPost , createopenModal , setIsMessage}) => {

    const postHeadingRef = useRef(null);
    const postDetailsRef = useRef(null);

    // const addPost = async () => {




    // }



    const newPost = async (e) => {
        e.preventDefault();
        // console.log("cityName: ", cityNameRef.current.value);


        if (postHeadingRef.current.value.trim().length != 0 && postDetailsRef.current.value.trim().length != 0) {

            try {
                console.log(postHeadingRef.current.value)
                console.log(postDetailsRef.current.value)

                // setposts([posts,])

                const Post = {
                    PostTitle: postHeadingRef.current.value,
                    Desc: postDetailsRef.current.value
                }

                createPost(Post)


                postHeadingRef.current.value = ''
                postDetailsRef.current.value = ''

                setIsMessage('Post Successfully Created :)')

                createopenModal()

            } catch (error) {
                // handle error
                console.log(error);

            }

        } else {

            setIsMessage('Both the input fields must not be empty.')

            createopenModal()

        }

        // const [posts, setposts] = useState[[]]

    };




    return (
        <div className="w-full rounded overflow-hidden  shadow-lg m-4">
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">Add a New Post</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        ref={postHeadingRef}
                        // onChange={handleInputChange}
                        placeholder="Title"
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="message"
                        ref={postDetailsRef}
                        // onChange={handleInputChange}
                        placeholder="Message"
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal resize-none"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    onClick={newPost}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                    Add Post
                </button>
            </div>
        </div>
    );
};

export default Createpostcard;
