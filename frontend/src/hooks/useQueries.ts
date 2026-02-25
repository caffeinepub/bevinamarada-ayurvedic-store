import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StockItem, Sale, SalesReports, UserProfile } from '../backend';
import { ExternalBlob } from '../backend';

// Cache configuration
const STALE_TIME = 30_000;       // 30 seconds
const GC_TIME = 300_000;         // 5 minutes

// ─── Stock Items ────────────────────────────────────────────────────────────

export function useGetAllStockItems() {
  const { actor, isFetching } = useActor();
  return useQuery<StockItem[]>({
    queryKey: ['stockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStockItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetLowStockItems() {
  const { actor, isFetching } = useActor();
  return useQuery<StockItem[]>({
    queryKey: ['lowStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLowStockItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetTrendingStockItems() {
  const { actor, isFetching } = useActor();
  return useQuery<StockItem[]>({
    queryKey: ['trendingStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingStockItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetExpiringStockItems() {
  const { actor, isFetching } = useActor();
  return useQuery<StockItem[]>({
    queryKey: ['expiringStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExpiringStockItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetExpiredStockItems() {
  const { actor, isFetching } = useActor();
  return useQuery<StockItem[]>({
    queryKey: ['expiredStockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExpiredStockItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export interface AddStockItemData {
  name: string;
  category: string;
  quantity: bigint;
  unitPrice: bigint;
  lowStockThreshold: bigint;
  image: ExternalBlob | null;
  expiryDate: bigint | null;
}

export interface UpdateStockItemData extends AddStockItemData {
  id: bigint;
}

export function useAddStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AddStockItemData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addStockItem(
        data.name,
        data.category,
        data.quantity,
        data.unitPrice,
        data.lowStockThreshold,
        data.image,
        data.expiryDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
    },
  });
}

export function useUpdateStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateStockItemData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateStockItem(
        data.id,
        data.name,
        data.category,
        data.quantity,
        data.unitPrice,
        data.lowStockThreshold,
        data.image,
        data.expiryDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
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
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
    },
  });
}

export function useMarkTrending() {
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
export const useMarkTrendingStockItem = useMarkTrending;

// ─── Sales ──────────────────────────────────────────────────────────────────

export function useGetTodaysSales() {
  const { actor, isFetching } = useActor();
  return useQuery<Sale[]>({
    queryKey: ['todaysSales'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTodaysSales();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetSalesReports() {
  const { actor, isFetching } = useActor();
  return useQuery<SalesReports>({
    queryKey: ['salesReports'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSalesReports();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
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
    retry: false,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
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

// ─── Trial Status ────────────────────────────────────────────────────────────

export function useGetTrialStatus() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['trialStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTrialStatus();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}
