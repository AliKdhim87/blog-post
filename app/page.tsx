import type { Metadata } from 'next';
import wretch from 'wretch';

import { BlogType, PageHeader, RecentPosts, SocialMedia } from '@/components/slices';
import { uuidv4 } from '@/utils';
import { GetHomePageQuery } from 'generated/graphql';
import { GET_HOME_PAGE } from 'queries/index.graphql';

const fetchData = async () => {
  try {
    const response = await wretch(process.env.SCHEMA_URL).post({
      query: GET_HOME_PAGE,
      variables: { slug: 'front-page' },
    });
    const { data } = await response.json<{ data: GetHomePageQuery }>();

    return {
      openGraph: data.allRoute[0].openGraph,
      page: data.allRoute[0].page,
      recentPosts: data.allPost,
    };
  } catch (error) {
    throw new Error('Error fetching site settings');
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { openGraph } = await fetchData();
  return {
    title: openGraph?.title,
    description: openGraph?.description,
  };
}

const Home = async () => {
  const data = await fetchData();

  return (
    <div>
      {data.page?.content?.map((component) => {
        switch (component?.__typename) {
          case 'PageHeader':
            return <PageHeader key={uuidv4()} title={component.title} body={component.body} titleDistancedBottom />;
          case 'SocialCollection':
            return <SocialMedia title={component.title} socialMedia={component?.items} key={uuidv4()} />;
          case 'BlogList':
            return (
              <RecentPosts
                title={component.title}
                blog={data.recentPosts as BlogType[]}
                cta={component.cta}
                key={uuidv4()}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Home;
// TODO build a custom field in the CMS to display the recent posts instead of fetch it from the API
