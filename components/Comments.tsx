"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import { Comment } from "@prisma/client";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({slug, id }: { id: string, slug:string }) => {
  const { data, mutate, isLoading } = useSWR(`/api/comments/${id}`, fetcher);

  const [loading, setIsLoaading] = useState(false)

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    setIsLoaading(true)
    await axios.post("/api/comments", {
      desc,
      id,
    });
    mutate();
    setIsLoaading(false)
  };

  return (
    <div className=" p-6 rounded-lg ">
      <h1 className="text-2xl font-semibold mb-4">Comments</h1>
      <div className="mb-6">
        <textarea
          placeholder="Write a comment..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
          onClick={handleSubmit}
        >
          {loading ? "Submitting..":"create"}
        </button>
      </div>
      <div className="space-y-6">
        {isLoading
          ? ""
          : data?.map((item: Comment) => (
              <div className="p-4 bg-white rounded-lg shadow-md" key={item.id}>
                <div className="flex items-center mb-2">
                  
                  <div className="ml-3">
                    <span className="font-semibold text-gray-800">{item.userEmail}</span>
                    <span className="text-sm text-gray-500 ml-2">{new Date(item.createdAt).toDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
