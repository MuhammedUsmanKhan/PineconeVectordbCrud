
import { useState, useRef, useEffect } from "react";
import { FaMarker, FaTrashCan } from "react-icons/fa6";
import Modal from '../modal/modal'
import axios from "axios";

const Postcard = ({ postDetails, verifydelPost, inpeditPost }) => {

  // const postidUpdateRef = useRef(null);
  // const postidDeletesRef = useRef(null);

  // postidUpdateRef = postDetails?._id
  // postidDeletesRef = postDetails?._id

  // console.log(postidDeletesRef)
  // console.log(postidUpdateRef)





  return (
    <div className="rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{postDetails?.PostTitle}</h2>
        <p className="text-gray-700 text-base">{postDetails?.Desc}</p>
      </div>
      <div className="flex justify-end space-x-4 p-5 pt-0">
        <button data-postid={postDetails?._id} onClick={inpeditPost} className="p-2 font-semibold bg-white hover:text-white text-green-600 hover:bg-green-600"><FaMarker /></button>
        <button data-postid={postDetails?._id} onClick={verifydelPost} className="p-2 font-semibold bg-white hover:text-white  text-red-600 hover:bg-red-600"><FaTrashCan /></button>
      </div>

    </div>
  );
};

export default Postcard;
