import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StockItem, Sale, SalesReports, UserProfile } from '../backend';

const QUERY_CONFIG = {
  staleTime: 60 * 1000,
  gcTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retry: 1,
};

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Stock Items ─────────────────────────────────────────────────────────────

export function useGetAllStockItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StockItem[]>({
    queryKey: ['stockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStockItems();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
  });
}

export function useGetTrendingStockItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StockItem[]>({
    queryKey: ['trendingStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingStockItems();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
  });
}

export function useGetLowStockItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StockItem[]>({
    queryKey: ['lowStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLowStockItems();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
  });
}

export function useGetExpiringStockItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StockItem[]>({
    queryKey: ['expiringStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExpiringStockItems();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
  });
}

export function useGetExpiredStockItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StockItem[]>({
    queryKey: ['expiredStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExpiredStockItems();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
  });
}

export function useAddStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      category: string;
      quantity: bigint;
      unitPrice: bigint;
      lowStockThreshold: bigint;
      image: import('../backend').ExternalBlob | null;
      expiryDate: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addStockItem(
        params.name,
        params.category,
        params.quantity,
        params.unitPrice,
        params.lowStockThreshold,
        params.image,
        params.expiryDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
    },
  });
}

export function useUpdateStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      name: string;
      category: string;
      quantity: bigint;
      unitPrice: bigint;
      lowStockThreshold: bigint;
      image: import('../backend').ExternalBlob | null;
      expiryDate: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateStockItem(
        params.id,
        params.name,
        params.category,
        params.quantity,
        params.unitPrice,
        params.lowStockThreshold,
        params.image,
        params.expiryDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
    },
  });
}

export function useDeleteStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteStockItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
    },
  });
}

export function useMarkTrendingStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isTrending }: { id: bigint; isTrending: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.markTrendingStockItem(id, isTrending);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
    },
  });
}

// Alias for backward compatibility
export const useMarkTrending = useMarkTrendingStockItem;

// ─── Sales ───────────────────────────────────────────────────────────────────

export function useGetTodaysSales() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Sale[]>({
    queryKey: ['todaysSales'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTodaysSales();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
  });
}

export function useGetSalesReports() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SalesReports>({
    queryKey: ['salesReports'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSalesReports();
    },
    enabled: !!actor && !actorFetching,
    ...QUERY_CONFIG,
  });
}

export function useAddSale() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ stockItemId, quantity }: { stockItemId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addSale(stockItemId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todaysSales'] });
      queryClient.invalidateQueries({ queryKey: ['salesReports'] });
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
    },
  });
}
