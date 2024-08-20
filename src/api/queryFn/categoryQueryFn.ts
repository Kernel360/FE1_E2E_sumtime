import axios, { AxiosError } from 'axios';

interface Category {
  id: number;
  title: string;
  color: string | null;
  isReported: boolean;
}

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get('/api/category');
    return data.categories;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error('AxiosError: 카테고리를 가져올 수 없습니다.', e.message);
    }
    throw e;
  }
};
