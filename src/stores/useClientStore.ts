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
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: number, updated: Partial<Client>) => void;
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      clients: [],
      addClient: (client) => {
        set((state) => ({
          clients: [
            ...state.clients,
            {
              ...client,
              id: state.clients.length ? state.clients[state.clients.length - 1].id + 1 : 1,
            },
          ],
        }))
      console.log(get().clients)
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
