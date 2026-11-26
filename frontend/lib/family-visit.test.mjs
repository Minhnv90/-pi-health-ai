import { test } from "node:test"
import assert from "node:assert/strict"
import { visitCards } from "./family-visit.mjs"

test("three distinct visit stages use only fixed official references", () => {
  const urls = [
    "https://medlineplus.gov/talkingwithyourdoctor.html",
    "https://www.ahrq.gov/questions/be-engaged/index.html",
    "https://www.ahrq.gov/health-literacy/improve/precautions/tool5.html",
  ]
  assert.deepEqual(visitCards.map(card => card.id), ["before", "during", "after"])
  const seen = []
  for (const card of visitCards) {
    assert.ok(card.notes.length >= 2)
    for (const source of [card.source, card.extraSource].filter(Boolean)) {
      assert.ok(urls.includes(source.url))
      seen.push(source.url)
    }
  }
  assert.deepEqual([...new Set(seen)], urls)
})
