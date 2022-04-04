import React, { useEffect, useState } from "react";
import Header from "../containers/Header/Header";
import CompomentLeft from "../containers/CompomentLeft";
import ListWatch from "../compoments/Compoment/ListWatch";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../firebase";
import { useOutletContext } from "react-router-dom";
function Watch(props) {
  const [watch, setWatch] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useOutletContext(); //
  //   console.log("user in watch ", user);
  useEffect(() => {
    (async () => {
      var arr = [];
      await db
        .collection("posts")
        .where("type", "==", "video")
        .limit(3)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc, i) => {
            // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
            arr.push(doc.data());
            console.log("arr lan ", i, doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      if (arr.length === 3) {
        setLoading(true);
      }
      setData(arr);
    })();
  }, []);
  console.log("list data", data.length);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <CircularProgress color="primary" />
        </>
      )}

      {data && data.length > 0 && user
        ? Array.from(data).map((d, index) => {
            return (
              <ListWatch post={d} key={index} userId={user.uid} index={index} />
            );
          })
        : null}
    </>
  );
}

export default Watch;
