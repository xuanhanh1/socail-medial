import React, { Component } from 'react';
import './App.scss';
import Router from './route';
import firebase from "firebase";
import { auth, db } from "./firebase";

export default function App() {
  return (
    <>
      <Router />
    </>
  )
}

