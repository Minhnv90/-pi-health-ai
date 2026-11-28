import { test } from "node:test"
import assert from "node:assert/strict"
import { getLesson, lessons, nextStudy, startStudy } from "./study-sample.mjs"

const solutions = [5+3, 3*4, 36/4, 9*6, 40*.25, -3+7, 24/3*5, (26-5)/3, Math.sqrt(121), 4**2-3*4+4, 5+(6-1)*3, 3*2**2-2]
test("all 12 distinct lessons accept independently solved answers and support hints before retry", () => {
  assert.deepEqual(lessons.map(({grade}) => grade), Array.from({length: 12}, (_, i) => i+1))
  assert.equal(new Set(lessons.map(({prompt}) => prompt)).size, 12)
  for (const [index, answer] of solutions.entries()) {
    const grade = index + 1
    assert.equal(getLesson(grade).answer, answer)
    let state = nextStudy(startStudy(grade), "hint")
    assert.equal(state.done, false)
    assert.equal(state.level, 1)
    state = nextStudy(state, "999")
    assert.equal(state.done, false)
    assert.equal(state.level, 2)
    assert.match(state.message, /thử lại/)
    state = nextStudy(state, String(answer))
    assert.equal(state.done, true)
    assert.match(state.message, /Đúng rồi/)
  }
})

test("pencil groups stay in grade 2; switch/reset starts clear", () => {
  assert.match(getLesson(2).prompt, /3 nhóm.*4 cây/)
  const completed = nextStudy(startStudy(2), "12")
  assert.equal(completed.done, true)
  assert.equal(nextStudy(completed, "hint"), completed)
  assert.deepEqual(startStudy(12), { ...startStudy(2), grade: 12 })
  assert.equal(startStudy(2).done, false)
})
test("unsupported text never echoed or saved", () => {
  const state = nextStudy(startStudy(), "PRIVATE-TEST-EXAMPLE")
  assert.doesNotMatch(JSON.stringify(state), /PRIVATE/)
  assert.equal(state.done, false)
  assert.equal(state.level, 0)
})

test("each grade supports alternate numeric notation and rejects non-numeric or out-of-range strings", () => {
  for (const [index, correct] of solutions.entries()) {
    const fresh = startStudy(index+1)
    assert.equal(nextStudy(fresh, ' ' + String(correct).padStart(3, '0') + ' ').done, true)
    for (const invalid of ['', '01234', 'ABC', '1.2', '12+0']) {
      const next = nextStudy(fresh, invalid)
      assert.equal(next.done, false)
      assert.equal(next.level, 0)
    }
  }
})

test("invalid grades safely fall back to the default grade", () => {
  for (const invalid of [-1, 0, 13, 2.5, NaN, "2", null, undefined]) {
    assert.equal(startStudy(invalid).grade, 2)
    assert.equal(getLesson(invalid).grade, 2)
  }
})

test("each grade offers a different approach after two hints without completing the exercise", () => {
  for (const lesson of lessons) {
    let state = startStudy(lesson.grade)
    state = nextStudy(nextStudy(state, "hint"), "hint")
    const alternate = nextStudy(state, "999")
    assert.match(alternate.message, /Thử cách khác:/)
    assert.notEqual(alternate.message, state.message)
    assert.equal(alternate.done, false)
    assert.ok(!alternate.message.includes(lesson.explanation))
    assert.equal(nextStudy(alternate, String(lesson.answer)).done, true)
  }
})

test("common wrong answers receive targeted rather than generic feedback", () => {
  const cases = [[2, 7, /số nhóm/], [5, 25, /tỉ lệ/], [8, 21, /3x/], [10, 4, /hạng tử/], [11, 23, /vị trí thứ nhất/]]
  for (const [grade, wrong, phrase] of cases) {
    const targeted = nextStudy(startStudy(grade), String(wrong))
    assert.match(targeted.message, /^Chưa đúng rồi, em thử lại nhé. Gợi ý 1:/)
    assert.match(targeted.message, phrase)
    assert.notEqual(targeted.message, nextStudy(startStudy(grade), "999").message)
    assert.equal(targeted.done, false)
  }
})
