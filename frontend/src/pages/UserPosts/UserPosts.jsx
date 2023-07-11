import React, { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";

const UserPosts = () => {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    PostService.getUserPosts(id)
      .then((res) => setUserPosts(res.data))
      .catch((error) => console.log(error));
  }, [userPosts]);

  console.log(userPosts);

  return (
    <div className="flex mt-[30px] w-[400px] md:h-[750px] md:w-[1350px] lg:h-full rounded-lg border border-primary overflow-hidden">
      <div className="w-1/4 bg-gray-500 border border-primary bg-lightGray flex flex-col">
        <h2 className="font-semibold text-xl bg-primary color-white p-5 text-white h-[70px]">
          My Memories
        </h2>
      </div>
      <div className="w-[80%] mt-[5px] h-full">
        <div className="grid grid-cols-4 gap-4 p-2 ">
          {userPosts.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );

};

export default UserPosts;
