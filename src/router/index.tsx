import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Rooms from "@/pages/Rooms";
import Room from "@/pages/Rooms/[id]";
import Streamers from "@/pages/Streamers";
import Streamer from "@/pages/Streamers/[id]";
import Profile from "@/pages/Profile";
import Rankings from "@/pages/Rankings";
import PublicLayout from "@/layouts/PublicLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Tables from "@/pages/Tables";
import Liverooms from "@/pages/Liverooms";
import Mutualrooms from "@/pages/Mutualrooms";
import Following from "@/pages/Following";

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="home" element={<ProtectedLayout />}>
          <Route index element={<Navigate to="rooms" replace />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<Room />} />
          <Route path="liverooms" element={<Liverooms />} />
          <Route path="mutualrooms" element={<Mutualrooms />} />
          <Route path="streamers" element={<Streamers />} />
          <Route path="streamers/:id" element={<Streamer />} />
          <Route path="tables" element={<Tables />} />
          <Route path="following" element={<Following />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
