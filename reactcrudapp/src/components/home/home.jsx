import { useState, useRef, useEffect } from "react";
import Modal from '../modal/modal'
import axios from 'axios'
import Createcard from '../createcard/card'
import Postcard from '../postcard/postcard'

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [postid, setIspostid] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [Message, setIsMessage] = useState(null);
    const edittedpostHeadingRef = useRef(null);
    const edittedpostDetailsRef = useRef(null);

    const deleteopenModal = () => {
        setIsDelete(true);
    }

    const deletecloseModal = () => {
        setIsDelete(false);
    }

    const createopenModal = () => {
        setIsCreate(true);
    }

    const createcloseModal = () => {
        setIsCreate(false);
    }

    const updateopenModal = () => {
        setIsUpdate(true);
    }

    const updatecloseModal = () => {
        setIsUpdate(false);
    }

    const readPost = async (e) => {
        // console.log("location: ", location);
        try {
            // console.log(postHeadingRef.current.value)
            // console.log(postDetailsRef.current.value)

            const getPost = await axios.get(`/api/v1/posts`)

            setPosts(getPost.data)
            console.log(getPost.data);


        } catch (error) {
            // handle error
            console.log(error);

        }
    }


    const deletePost = async (postid) => {

        try {

            const delPost = await axios.delete(`/api/v1/post/delete/${postid}`)

            console.log(delPost);
            readPost();
            deletecloseModal()

        } catch (error) {
            // handle error
            console.log(error);

        }
    }

    const editPost = async (postid) => {

        console.log(edittedpostHeadingRef.current.value)
        console.log(edittedpostDetailsRef.current.value)
        console.log(postid)

        if (edittedpostHeadingRef.current.value.trim().length != 0 && edittedpostDetailsRef.current.value.trim().length != 0) {

            try {

                const editPost = await axios.put(`/api/v1/post/update/${postid}`, {
                    PostTitle: edittedpostHeadingRef.current.value,
                    Desc: edittedpostDetailsRef.current.value
                })

                console.log(editPost);
                readPost();
                updatecloseModal();

            } catch (error) {
                // handle error
                console.log(error);

            }
        }
        else {

            setIsMessage('Both the input fields must not be empty.') 

            createopenModal()
            
        }


    }



    const verifydelPost = (e) => {
        console.log(e.target.dataset.postid)
        const postID = e.target.dataset.postid
        setIspostid(postID)
        deleteopenModal();
    }

    const inpeditPost = (e) => {
        // console.log(e.target.dataset.postid)
        const postID = e.target.dataset.postid
        setIspostid(postID)
        updateopenModal();
    }


    useEffect(() => {


        // const controller = new AbortController();


        readPost()
        // return () => {
        //   // cleanup function
        //   controller.abort();
        // };
    }, []);

    const addNewPost = async (newPost) => {
        try {
            const response = await axios.post(`/api/v1/post`, newPost);
            console.log(response)
            // Update the state to include the new post
            const Message = response.data
            readPost();
            createopenModal();

        } catch (error) {
            console.error("Error adding new post: ", error);
        }
    };


    return (
        <div className=''>
            <div className='flex justify-center text-4xl  p-4'>
                <h1 className=''>React ExpressServer Based CrudApp</h1>
            </div>
            <div className='container  mx-auto flex flex-col space-y-4'>
                <div className='flex justify-center '>
                    <Createcard createPost={addNewPost} createopenModal={createopenModal} setIsMessage={setIsMessage} />
                </div>
                <div className='grid sm:grid-col-1 md:grid-cols-3 '>
                    {posts.toReversed().map((eachpost, index) => {
                        return <Postcard key={index} postDetails={eachpost} inpeditPost={inpeditPost} verifydelPost={verifydelPost} />;
                    })}
                </div>
            </div>
            <Modal isDelete={isDelete} postid={postid} Message={Message} edittedpostHeadingRef={edittedpostHeadingRef} edittedpostDetailsRef={edittedpostDetailsRef} isUpdate={isUpdate} isCreate={isCreate} deletePost={deletePost} editPost={editPost} deletecloseModal={deletecloseModal} updatecloseModal={updatecloseModal} createcloseModal={createcloseModal}  > </Modal>
            {/* <Modal isCreate={isCreate} >
                <h1 className="text-2xl mb-4">Are you sure to Delete</h1>
            </Modal> */}
        </div >


    );
};

export default Home;
