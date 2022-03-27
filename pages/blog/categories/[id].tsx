import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, NextPage } from 'next';

import { Layout } from '@/components/global';
import { PageHeader, RecentPosts } from '@/components/slices';
import { client, createNavData } from '@/utils';
import {
  Category,
  GetAllBlogByCategoryIdQuery,
  GetAllCategoryIdQuery,
  GetSiteSettingsQuery,
  Post,
  SiteSettings,
} from 'generated/graphql';
import { GET_ALL_BLOG_BY_CATEGORY_ID, GET_ALL_CATEGORY_ID, GET_SITE_SETTINGS } from 'queries/index.graphql';

interface BlogCategoriesProps {
  allPost: Post[];
  Category: Category;
  SiteSettings: SiteSettings;
}

const BlogCategories: NextPage<BlogCategoriesProps> = ({
  allPost,
  Category,
  SiteSettings: { footer, navigation, openGraph },
}) => (
  <Layout nav={createNavData(navigation)} footer={footer?.copyright} seo={openGraph}>
    {Category && Category.title && <PageHeader title={Category.title} />}
    <RecentPosts blog={allPost} />
  </Layout>
);

export default BlogCategories;

export async function getStaticPaths() {
  const { data: allCategoryData } = await client.query<GetAllCategoryIdQuery>({
    query: GET_ALL_CATEGORY_ID,
  });
  const paths = allCategoryData.allCategory.map((category) => {
    return { params: { id: category._id } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;

  const { data } = await client.query<GetAllBlogByCategoryIdQuery>({
    query: GET_ALL_BLOG_BY_CATEGORY_ID,
    variables: { categoryId: id },
  });

  const {
    data: { SiteSettings },
  } = await client.query<GetSiteSettingsQuery>({
    query: GET_SITE_SETTINGS,
  });

  if (data.allPost.length === 0) {
    return {
      notFound: true,
      props: {
        SiteSettings,
      },
    };
  } else {
    return { props: { ...data, SiteSettings: SiteSettings }, revalidate: 60 };
  }
};
