import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const prerender = false;
export const ssr = false;

export const load: PageLoad = (event) => {
  try {
    console.log(JSON.stringify({ fb: event }, null, 2));
  } catch (error) {
    console.log({ fb: event });
  }

  const { params } = event;

  if (params.slug === 'hello-world') {
    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
    };
  }

  throw error(404, 'Not found');
};
