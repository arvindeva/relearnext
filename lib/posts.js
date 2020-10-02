import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// Get all posts from /posts sorted by date.
export function getSortedPostsData() {
  // Get file names under /posts directory.
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date.
  const sortedPostsByDate = allPostsData.sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
  return sortedPostsByDate;
}

// Get all posts IDs as param objects.
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array of objects consisting id params:
  // [{ params: { id: ''} }, { params: { id: ''} }]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // get metadata using gray matter
  const matterResult = matter(fileContents);

  // get markdown into HTML string using remark
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
