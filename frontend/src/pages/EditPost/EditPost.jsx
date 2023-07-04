import React, { useEffect, useRef, useState } from "react";
import PostService from "../../services/PostService";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { FileParser } from "../../utils/FileParser";
import { toast } from "react-toastify";
import * as Yup from "yup";

const EditPost = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const ref = useRef();
  const [editPost, setEditPost] = useState(false);

  const VALID_TYPE = ["image/jpg", "image/jpeg", "image/png"];
  const KB = 1024;
  const MB = KB * 1024;

  useEffect(() => {
    PostService.getSinglePost(id)
      .then((res) => setPost(res.data))
      .catch((error) => console.log(error));
  }, [editPost.isEdited]);

  const formik = useFormik({
    initialValues: {
      title: post.title || "",
      body: post.body || "",
      image: post.image || "",
      isPublic: post.isPublic || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Field is required!"),
      body: Yup.string().required("Field is required!"),
    }),
    onSubmit: (values) => {
      FileParser(values.image)
        .then((res) => {
          PostService.editPost(
            {
              ...values,
              image: res,
            },
            id
          )
            .then((res) => {
              console.log(res);
              ref.current.value = "";
              setEditPost(true);
              toast.success("Post edited successfully!");
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
  });

  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div className="flex mt-[30px] border border-primary rounded-lg">
      <div className="w-[600px]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-1 p-5"
        >
          <label>
            Title: <span className="text-red-600">{showError("title")}</span>
          </label>
          <input
            name="title"
            className="h-[40px] outline-none border border-primary rounded-lg p-2"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <label>
            Body: <span className="text-red-600">{showError("body")}</span>
          </label>

          <textarea
            name="body"
            className="h-[150px] outline-none border border-primary  rounded-lg p-2"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <select
            name="isPublic"
            className="mt-[5px] h-[30px]"
            onChange={formik.handleChange}
            value={formik.values.isPublic}
          >
            <option value="false">Private</option>
            <option value="true">Public</option>
          </select>

          <button
            className=" mt-[50px] h-[40px] bg-primary text-white p-2 rounded-lg"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
      <div className="w-[600px] p-[20px] flex flex-col gap-3 items-center">
        <img
          className="rounded-lg w-[400px] h-[300px]"
          src={post.image}
          alt="post-img"
        />
        <input
          type="file"
          name="image"
          ref={ref}
          onChange={(e) =>
            formik.setFieldValue(e.target.name, e.target.files[0])
          }
        />
      </div>
    </div>
  );
};

export default EditPost;
