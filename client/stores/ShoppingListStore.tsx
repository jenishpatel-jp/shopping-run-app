import { useCallback } from "react";
import { randomUUID } from "expo-crypto";
import { debounce } from 'lodash'
import { useRemoteRowId } from "tinybase/ui-react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import {
  Cell,
  createMergeableStore,
  createRelationships,
  Value,
} from "tinybase/with-schemas";
import { useCreateClientPersisterAndStart } from "./persistence/useCreateClientPersisterAndStart";
import { useCreateServerSynchronizerAndStart } from "./synchronization/useCreateServerSynchronizationAndStart";
import { useUserIdAndNickname } from "@/hooks/useNickname";


const STORE_ID_PREFIX = "shoppingListStore-";

const VALUES_SCHEMA = {
  listId: { type: "string" },
  name: { type: "string" },
  description: { type: "string" },
  emoji: { type: "string" },
  color: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
} as const;

const TABLES_SCHEMA = {
  products: {
    id: { type: "string" },
    name: { type: "string" },
    quantity: { type: "number" },
    units: { type: "string" },
    isPurchased: { type: "boolean", default: false },
    category: { type: "string", default: "" },
    notes: { type: "string" },
    createdBy: { type: "string" }, // userId
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
  collaborators: {
    nickname: { type: "string" },
  },
} as const;

type Schemas = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA];
type ShoppingListValueId = keyof typeof VALUES_SCHEMA;
type ShoppingListProductCellId = keyof (typeof TABLES_SCHEMA)["products"];

const {
  useCell,
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideRelationships,
  useProvideStore,
  useRowCount,
  useSetCellCallback,
  useSetValueCallback,
  useSortedRowIds,
  useStore,
  useCreateRelationships,
  useTable,
  useValue,
  useValuesListener,
} = UiReact as UiReact.WithSchemas<Schemas>;

const useStoreId = (listId: string) => STORE_ID_PREFIX + listId;

// Create, persist, and sync a store containing the shopping list and products 
export default function ShoppingListStore({
    listId,
    initialContentJson,
 }: {
    listId: string;
    initialContentJson: string;
 }) {
    const storeId = useStoreId(listId);
    const store = useCreateMergeableStore(() => createMergeableStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA));

    const [userId, nickname] = useUserIdAndNickname();
    // Persist store (with intial content if it hasn't been saved before), then
    // ensure the current user is added as a colloborater.

    useCreateClientPersisterAndStart(storeId, store, initialContentJson, () =>
        store.setRow("collaborators", userId, { nickname })
    );
    useCreateServerSynchronizerAndStart(storeId, store);
    useProvideStore(storeId, store);

    return null;
    
    //todo
 }
