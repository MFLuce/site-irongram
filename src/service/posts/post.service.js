const posts = [
  {
    id: "123",
    content: "Feeling blessed. Woke up like this. #livingthelife #nofilter",
    image:
      "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fbeta.ctvnews.ca%2Fcontent%2Fdam%2Fctvnews%2Fimages%2F2019%2F11%2F18%2F1_4691731.png%3Fcache_timestamp%3D1574134871525&sp=1636049065T284b1a325bbeb0c2d0ecce8350c81787be51afb65220e512e19c61ef42b6e5e5",
  },
  {
    id: "fancy",
    content: "Im so fancy, you already know. #f4f #friendslearnwithme",
    image: "https://i.ytimg.com/vi/WCcpSyVWMwU/maxresdefault.jpg",
  },
  {
    id: "absdkasdfgkjhsdf",
    content: "This is not an image",
    image:
      "https://static.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425",
  },
];

export function getPosts() {
  return Promise.resolve(posts);
}

export function getSinglePost(id) {
  const singlePost = posts.find((element) => element.id === id);

  if (!singlePost) {
    return Promise.reject("Doesnt exist");
  }

  return Promise.resolve(singlePost);
}
