import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts directory.
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id.
    const id = fileName.replace(/\.md$/, '');

    // Read markdown files as string.
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // Use gray-matter to parse the post metadata section.
    const matterResult = matter(fileContents);

    // Combine the data with the id.
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
