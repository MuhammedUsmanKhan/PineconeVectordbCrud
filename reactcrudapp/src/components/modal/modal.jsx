import { FaTrashCan, FaCircleXmark } from "react-icons/fa6";
import React, { useState } from 'react';

const Modal = ({ isDelete, isUpdate, isCreate, Message, deletecloseModal, edittedpostHeadingRef, edittedpostDetailsRef, updatecloseModal, editPost, createcloseModal, deletePost, postid }) => {
  return (
    <>
      {isDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" relative flex justify-center items-center modal-overlay w-full h-full" >
            <div className="modal-container absolute">
              <div className="bg-white rounded shadow-lg p-6">
                <h1 className="text-2xl mb-4">Are you sure to Delete</h1>
                <div className='flex justify-between'>
                  <button data-postid={postid} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => { deletePost(postid) }}  >
                    Yes
                  </button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={deletecloseModal} >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isUpdate && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" relative flex justify-center items-center modal-overlay w-full h-full" >
            <div className="modal-container bg-white  absolute min-w-[60%]">
              <div className="rounded shadow-lg pt-4 pb-4  ">
                <div className='border-b-2 pl-6  border-solid '>
                  <h1 className="text-2xl mb-4">Update Post</h1>
                </div>
                <div className="flex flex-col p-6 space-y-3 md:space-y-4 w-full">
                  <div className="relative">
                    <input ref={edittedpostHeadingRef} type="text" required
                      className="w-full p-2  transition-colors peer  outline-none border-2 duration-500"
                      autocomplete="off" />
                    <label id="postLabel" htmlFor="Title"
                      className="absolute peer-valid:text-xs peer-valid:transform peer-valid:-translate-y-6 peer-valid:pl-1 peer-valid:pr-1 peer-valid:bg-white  peer-focus:text-xs peer-focus:bg-white  peer-focus:transform peer-focus:-translate-y-6 peer-focus:pl-1 peer-focus:pr-1  bottom-[0.6rem] left-3  font-semibold  duration-500 transition-all">Post
                      Title</label>
                  </div>
                  <div className="relative h-full">
                    <textarea ref={edittedpostDetailsRef} rows='12' required
                      className="shadow appearance-none peer duration-500 border-2  resize-none rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline "></textarea>
                    <label htmlFor="textArea"
                      className="absolute peer-focus:text-xs top-1 left-3  font-semibold peer-valid:text-xs peer-valid:transform peer-valid:-translate-y-3 peer-valid:pl-1 peer-valid:pr-1 peer-valid:bg-white peer-focus:bg-white peer-focus:transform peer-focus:-translate-y-3 peer-focus:pl-1 peer-focus:pr-1 duration-500 transition-all">Enter
                      text here!</label>
                  </div>
                </div>
                <div className='flex justify-between p-6 pt-0 pb-2 '>
                  <button onClick={() => { editPost(postid) }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >
                    Update
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={updatecloseModal}  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCreate && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" relative flex justify-center items-center modal-overlay w-full h-full" >
            <div className="modal-container absolute">
              <div className="bg-white rounded shadow-lg p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-end" >
                    <button onClick={createcloseModal}>
                      <FaCircleXmark className="text-2xl" />
                    </button>
                  </div>
                  <div>
                    <h1 className="text-2xl mb-4">{Message}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Modal;