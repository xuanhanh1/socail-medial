import React, { useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { db } from "../../firebase";
import firebase from "firebase";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles({
  searchInput: {
    "& div": {
      borderRadius: "50px",
    },
    "& label": {
      paddingLeft: "10px",
    },
  },
  iconBtn: {
    position: "absolute !important",
    top: "3px",
    right: "76px",
  },
});

export default function Asynchronous(props) {
  let { arrIdFollower, user, arrContacts } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = useState();
  console.log("Asynchronous - value", value);
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.
      console.log("arr follower ", arrIdFollower);
      console.log("arr contact ", arrContacts);
      let arr = [];
      let arrContactsId = [];

      if (arrIdFollower && arrContacts) {
        arrContacts.forEach((contact) => {
          arrContactsId.push(contact.contactId);
        });
        console.log("arr contact id ", arrContactsId);

        arrIdFollower.forEach((follower) => {
          if (!arrContactsId.includes(follower.uid)) {
            arr.push(follower);
          }
        });
      }
      console.log("arr conversation ", arr);

      if (active) {
        setOptions([...arr]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const isOptionEqualToValue = (option, value) => {
    if (option.displayName === value.displayName) {
      setValue(value);
    }
  };

  const handleAddConversation = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("messages")
      .doc(value.uid)
      .set({
        contactId: value.uid,
        roomId: value.uid,
        contactName: value.displayName,
        contactPhotoURL: value.photoURL,
        lastMessage: [],
        messages: [],
        messagesWait: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Document successfully written!");
        setValue();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    db.collection("users")
      .doc(value.uid)
      .collection("messages")
      .doc(user.uid)
      .set({
        contactId: user.uid,
        roomId: user.uid,
        contactName: user.displayName,
        contactPhotoURL: user.photoURL,
        lastMessage: [],
        messages: [],
        messagesWait: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Document successfully written!");
        setValue();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <div className="search-box">
      <Autocomplete
        id="asynchronous-demo"
        sx={{
          width: 300,
          width: "auto",
          padding: "0 20px",
          borderRadius: "50px",
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        className={classes.searchParent}
        isOptionEqualToValue={(option, value) =>
          isOptionEqualToValue(option, value)
        }
        getOptionLabel={(option) => option.displayName}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            className={classes.searchInput}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#f0f2f5",
              padding: "-2px 5px",
            }}
            {...params}
            label="Search in messages"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      {value ? (
        <IconButton className={classes.iconBtn} onClick={handleAddConversation}>
          <KeyboardTabIcon
            color="secondaryDark"
            sx={{
              fontSize: "2rem",
            }}
          />
        </IconButton>
      ) : null}
    </div>
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
