import { useQuery } from '@tanstack/react-query'

import { BrandService } from '@/services/brandService'

export function useBrandData() {
  return useQuery({
    queryKey: ['brand'],
    queryFn: () => BrandService.fetchBrandData(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  })
}
