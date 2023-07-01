import React, { useEffect, useState } from "react";
import TagsService from "../../services/TagsService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FileParser } from "../../utils/FileParser";
import PostService from "../../services/PostService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/postsSlice";

const CreatePost = () => {
  const [tags, setTags] = useState([]);

  let user = JSON.parse(localStorage.getItem("sa_user"));

  const KB = 1024;
  const MB = KB * 1024;
  let validType = ["image/jpg", "image/jpeg", "image/png"];

  const dispatch = useDispatch();

  useEffect(() => {
    TagsService.allTags()
      .then((res) => setTags(res.data.tags))
      .catch((error) => console.log(error));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      tags: [],
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Field is required"),
      body: Yup.string().required("Field is required"),
      tags: Yup.array().min(1).required("Field is required"),
      image: Yup.mixed()
        .required("Field is required")
        .test("fileSize", "Wrong file size", (value) => value.size < MB * 2)
        .test("fileType", "Wrong file type.", (value) =>
          validType.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      values.tags = tags.map((el) => {
        return { name: el.name };
      });
      FileParser(values.image)
        .then((res) => {
          PostService.createNewPost({
            ...values,
            image: res,
            userId: user._id,
          })
            .then((res) => dispatch(createPost()))
            .catch((error) => console.log(error));
          toast.success("Post created successfully");
        })
        .catch((error) => console.log(error));

      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col gap-3 p-3 border border-primary mt-[70px] rounded-md">
      <p className="mx-auto text-2xl mb-[20px]">Creating A Memory</p>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Title"
          className="h-[50px] p-2 border border-gray-500 rounded-md "
        ></input>
        <input
          type="text"
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          placeholder="Message"
          className="h-[50px] p-2 border border-gray-500 rounded-md "
        ></input>
        <label>Tags:</label>
        <div className="grid grid-cols-4 gap-2">
          {tags.map((tag, i) => (
            <div
              className="flex items-center gap-1 bg-[#E8E8E8] rounded-md p-[5px]"
              key={i}
            >
              <input
                className="bg-[#E8E8E8]"
                name="tags"
                type="checkbox"
                value={tag.name}
                onChange={formik.handleChange}
              />
              <p>#{tag.name}</p>
            </div>
          ))}
        </div>
        <input
          type="file"
          name="image"
          onChange={(e) =>
            formik.setFieldValue(e.target.name, e.target.files[0])
          }
        ></input>
        <button
          type="submit"
          className="bg-primary text-white h-[70px] rounded-md"
        >
          SUBMIT
        </button>
        <button
          type="button"
          className="bg-red-600 text-white h-[50px] rounded-md"
        >
          CLEAR
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
