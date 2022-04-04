import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListImageTrending from "../compoments/Compoment/ListImageTrending";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { db } from "../firebase";
import { ImageList, CardMedia } from "@mui/material";
function Trending() {
  const [trend, setTrend] = useState(true);
  const [Cd, setCd] = React.useState(false);
  const [dataPosts, setDataPosts] = useState();
  const userInfor = useSelector((state) => state.userInfor);
  const [user, setUser] = useState(userInfor);
  useEffect(() => {
    if (window.innerWidth < 740) {
      setCd(true);
    }
  }, []);
  useEffect(() => {
    setUser(userInfor);
    getPostTrend();
  }, [userInfor]);

  const getPostTrend = async () => {
    let arr = [];
    await db
      .collection("posts")
      .orderBy("likeBy", "desc")
      .limit(9)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //   console.log(doc.id, " => ", doc.data());
          arr.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setDataPosts(arr);
  };

  return (
    <>
      <Box>
        <ImageList variant="masonry" gap={8} cols={Cd ? 2 : 3}>
          <div data-aos="zoom-in">
            {dataPosts && dataPosts.length > 0
              ? dataPosts.map((data, i) => (
                  <ListImageTrending
                    key={i}
                    dataPosts={data}
                    userId={user ? user.uid : null}
                  />
                ))
              : ""}
          </div>
        </ImageList>
      </Box>
    </>
  );
}

export default Trending;
