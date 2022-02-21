import React, { Component } from 'react';
import './App.scss';
import Router from './route';
import { db, auth } from "./firebase";


export default function App() {
  return (
    <>
      <Router />
    </>
  )
}

