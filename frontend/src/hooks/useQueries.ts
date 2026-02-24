import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StockItem, Sale, RevenueOverview, IncomeSummary, UserProfile } from '../backend';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

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
      toast.success('Profile saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save profile: ${error.message}`);
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Stock Items ─────────────────────────────────────────────────────────────

export function useGetAllStockItems() {
  const { actor, isFetching } = useActor();

  return useQuery<StockItem[]>({
    queryKey: ['stockItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStockItems();
    },
    enabled: !!actor && !isFetching,
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
  });
}

export function useAddStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      category: string;
      quantity: bigint;
      unitPrice: bigint;
      lowStockThreshold: bigint;
      image: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addStockItem(
        data.name,
        data.category,
        data.quantity,
        data.unitPrice,
        data.lowStockThreshold,
        data.image,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
      toast.success('Stock item added successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add stock item: ${error.message}`);
    },
  });
}

export function useUpdateStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      category: string;
      quantity: bigint;
      unitPrice: bigint;
      lowStockThreshold: bigint;
      image: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateStockItem(
        data.id,
        data.name,
        data.category,
        data.quantity,
        data.unitPrice,
        data.lowStockThreshold,
        data.image,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
      toast.success('Stock item updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update stock item: ${error.message}`);
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
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
      toast.success('Stock item deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete stock item: ${error.message}`);
    },
  });
}

export function useMarkTrendingStockItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: bigint; isTrending: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.markTrendingStockItem(data.id, data.isTrending);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['trendingStockItems'] });
      toast.success(variables.isTrending ? 'Marked as trending' : 'Removed from trending');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update trending status: ${error.message}`);
    },
  });
}

// ─── Sales ───────────────────────────────────────────────────────────────────

export function useGetTodaysSales() {
  const { actor, isFetching } = useActor();

  return useQuery<Sale[]>({
    queryKey: ['todaysSales'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTodaysSales();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSale() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { stockItemId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addSale(data.stockItemId, data.quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] });
      queryClient.invalidateQueries({ queryKey: ['lowStockItems'] });
      queryClient.invalidateQueries({ queryKey: ['todaysSales'] });
      queryClient.invalidateQueries({ queryKey: ['revenueOverview'] });
      queryClient.invalidateQueries({ queryKey: ['incomeSummary'] });
      toast.success('Sale recorded successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to record sale: ${error.message}`);
    },
  });
}

// ─── Revenue & Income ─────────────────────────────────────────────────────────

export function useGetRevenueOverview() {
  const { actor, isFetching } = useActor();

  return useQuery<RevenueOverview>({
    queryKey: ['revenueOverview'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getRevenueOverview();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetIncomeSummary() {
  const { actor, isFetching } = useActor();

  return useQuery<IncomeSummary>({
    queryKey: ['incomeSummary'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getIncomeSummary();
    },
    enabled: !!actor && !isFetching,
  });
}
