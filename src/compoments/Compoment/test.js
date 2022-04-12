import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function Test() {
  const userInform = useSelector((state) => state.userInfor);
  useEffect(() => {
    console.log("test", userInform);
  }, [userInform]);
  return <div>test</div>;
}

export default Test;
