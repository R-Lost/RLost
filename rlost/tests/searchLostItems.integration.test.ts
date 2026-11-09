import { beforeAll, describe, expect, it } from "vitest";
import { initializeApp } from "firebase/app";
import { connectDataConnectEmulator, getDataConnect } from "firebase/data-connect";
import {
  createItem,
  searchLostItems,
  type SearchLostItemsVariables,
} from "@dataconnect/generated";
import { connectorConfig } from "@dataconnect/generated";

const app = initializeApp({
  apiKey: "demo-api-key",
  projectId: "demo-r-lost",
  appId: "demo-app-id",
});
const dataConnect = getDataConnect(app, connectorConfig);
connectDataConnectEmulator(dataConnect, "127.0.0.1", 9399);

const testRun = Date.now().toString();
const location = `Search Test Library ${testRun}`;
const category = `Search Test Electronics ${testRun}`;
const otherCategory = `Search Test Clothing ${testRun}`;

const testItems = {
  matching: `Search test matching ${testRun}`,
  sameLocation: `Search test same location ${testRun}`,
  sameCategory: `Search test same category ${testRun}`,
  nullableFields: `Search test nullable fields ${testRun}`,
};

async function search(variables: SearchLostItemsVariables = {}) {
  const result = await searchLostItems(dataConnect, variables);
  return result.data.items.filter((item) => item.itemName.endsWith(testRun));
}

beforeAll(async () => {
  await Promise.all([
    createItem(dataConnect, {
      itemName: testItems.matching,
      description: "Integration-test record",
      location,
      category,
      lostStatus: true,
    }),
    createItem(dataConnect, {
      itemName: testItems.sameLocation,
      description: "Integration-test record",
      location,
      category: otherCategory,
      lostStatus: true,
    }),
    createItem(dataConnect, {
      itemName: testItems.sameCategory,
      description: "Integration-test record",
      location: `Search Test Hub ${testRun}`,
      category,
      lostStatus: true,
    }),
    createItem(dataConnect, {
      itemName: testItems.nullableFields,
      description: "Integration-test record",
      location: null,
      category: null,
      lostStatus: true,
    }),
  ]);
});

describe("SearchLostItems optional filters", () => {
  it("applies both location and category filters", async () => {
    const items = await search({ location, category });

    expect(items.map((item) => item.itemName)).toEqual([testItems.matching]);
  });

  it("ignores an omitted category filter", async () => {
    const items = await search({ location });

    expect(items.map((item) => item.itemName).sort()).toEqual(
      [testItems.matching, testItems.sameLocation].sort(),
    );
  });

  it("ignores an omitted location filter", async () => {
    const items = await search({ category });

    expect(items.map((item) => item.itemName).sort()).toEqual(
      [testItems.matching, testItems.sameCategory].sort(),
    );
  });

  it("returns all lost items when both filters are omitted", async () => {
    const items = await search();

    expect(items.map((item) => item.itemName).sort()).toEqual(
      Object.values(testItems).sort(),
    );
  });

  it("treats explicit null filters as null-value comparisons", async () => {
    const items = await search({ location: null, category: null });

    expect(items.map((item) => item.itemName)).toEqual([
      testItems.nullableFields,
    ]);
  });

  it("never returns found items", async () => {
    await createItem(dataConnect, {
      itemName: `Search test found item ${testRun}`,
      description: "Integration-test record",
      location,
      category,
      lostStatus: false,
    });

    const items = await search({ location, category });

    expect(items.map((item) => item.itemName)).toEqual([testItems.matching]);
  });
});
