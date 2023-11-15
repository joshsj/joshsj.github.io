const { data, content } = matter(file.contents, { excerpt: false });

return {
  file: file.with({ contents: content }), // Exclude front matter from contents
  data: data as PostData,                 // Putting trust in myself
};