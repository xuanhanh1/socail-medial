export function getAllUsers() {}

export function compareFollowerId(arrFollow, id) {
  let result = null;
  let index = null;
  arrFollow.forEach((follow, i) => {
    if (follow.uid == id) {
      index = i;
      result = true;
    }
  });
  return { result, index };
}
