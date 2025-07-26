import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Client = {
  id: number;
  name: string;
  gstin: string;
  address: string;
  contact: string;
  email: string;
};

interface ClientStore {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => Client;
  updateClient: (id: number, updated: Partial<Client>) => void;
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      clients: [],
      addClient: (client) => {
        const newClient = {
          ...client,
          id: get().clients.length ? get().clients[get().clients.length - 1].id + 1 : 1,
        };
        set((state) => ({
          clients: [...state.clients, newClient],
        }));
        console.log(get().clients);
        return newClient;
      },
      updateClient: (id, updated) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, ...updated } : c
          ),
        }));
      },
    }),
    {
      name: 'client-storage',
    }
  )
);
