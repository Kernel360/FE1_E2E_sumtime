import { useQuery } from '@tanstack/react-query';
import { Category, getCategoryList } from '@/api/queryFn/categoryQueryFn';

const useGetCategoryList = (initialData?: Category[]) => {
  const { data: categoryList, isLoading } = useQuery({
    queryKey: ['categoryList'],
    queryFn: () => getCategoryList(),
    initialData,
  });

  return { categoryList, isLoading };
};

export default useGetCategoryList;
