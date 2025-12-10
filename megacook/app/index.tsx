import React from "react";
import HomePage from "@/pages/HomePage";
import { StatusBar } from "react-native";

export default function Menu() {
  return (
    <>
      <StatusBar hidden />
      <HomePage />
    </>
  );
}
