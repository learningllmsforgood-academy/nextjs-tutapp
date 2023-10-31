import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const getFileNames = () => fs.readdirSync(postsDirectory);

export function getAllPostIds() {
  const fileNames = getFileNames();
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }));
}

function _getPostData(id, getContent) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const { title, date, ...postMeta } = matterResult.data;

  let contentHtml;

  if (getContent) {
    const postMd = matterResult.content;
    contentHtml = getPostContentHtml(postMd);
  }

  return { id, title, date, postMeta, contentHtml };
}

export async function getPostDataWithContent(id) {
  const { title, date, postMeta, contentHtml: contentHtmlPromise } = _getPostData(id, true);
  const contentHtml = await contentHtmlPromise;
  return { id, title, date, postMeta, contentHtml };
}

export function getPostDataWithoutContent(id) {
  const { title, date, postMeta } = _getPostData(id, false);
  return { id, title, date, postMeta }; 
}


async function getPostContentHtml(postMd) {
  const processedContent = await remark()
    .use(html)
    .process(postMd);
  const contentHtml = processedContent.toString();
  return contentHtml;
}

export function getSortedPostsDataWithoutContent() {
  const postIds = getAllPostIds().map(({ params: { id } })=> id);
  const allPostsData = postIds.map(id => getPostDataWithoutContent(id, false));

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
