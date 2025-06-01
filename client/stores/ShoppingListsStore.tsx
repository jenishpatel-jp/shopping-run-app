import React, { useCallback } from "react";
import { randomUUID } from "expo-crypto";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore, NoValuesSchema } from "tinybase/with-schemas";
import { useCreateClientPersisterAndStart } from "@/stores/persistence/useCreateClientPersisterAndStart";
import { useUser } from "@clerk/clerk-expo";
import ShoppingListStore from "./ShoppingListStore";
import { useCreateServerSynchronizerAndStart } from "./synchronization/useCreateServerSynchronizationAndStart";
import { useStoreIds } from "tinybase/ui-react";

const STORE_ID_PREFIX = 'shoppingListsStore-';

const TABLES_SCHEMA = {
    lists: {
        id: {type : "string"},
        initialContentJson: {type: "string"},
    },

} as const;

const {
  useCell,
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideStore,
  useRowIds,
  useSetCellCallback,
  useSortedRowIds,
  useStore,
  useTable,
} = UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

const useStoreId = () => STORE_ID_PREFIX + useUser().user.id;

// Returns a callback that adds a new shopping list to the store. 
export const useAddShoppingListCallback = () => {
    const store = useStore(useStoreId())

    return useCallback(
        (name: string, description: string, emoji: string, color: string) => {
            const id = randomUUID();
            store.setRow("lists", id, {
                id, 
                initialContentJson: JSON.stringify([
                    {},
                    {
                        id, 
                        name,
                        description, 
                        emoji, 
                        color,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString,
                    }
                ]), 
            
            })
        }, 
        [store]
    )
}

export default function ShoppingListsStore() {
    const storeId = useStoreId()
    const store = useCreateMergeableStore(() =>
        createMergeableStore().setTablesSchema(TABLES_SCHEMA)
    );

    useCreateClientPersisterAndStart(storeId, store);
    useCreateServerSynchronizerAndStart(storeId, store);
    useProvideStore(storeId, store);
    const currentUserLists = useTable("lists", storeId)

    return Object.entries(useTable("lists", storeId)).map(
        ([listId, { initialContentJson }]) => ( 
            <ShoppingListStore 
                listId={listId}
                initialContentJson={initialContentJson}
                key={listId}
            />
         )
    )

}