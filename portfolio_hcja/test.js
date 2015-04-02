test("some tests", function() {
  expect(3);
 
  ok(true, "passes because true is true");
  equal("1", 1, "passes because '1' == 1");
  strictEqual("1", 1, "fails because '1' !== 1");
});